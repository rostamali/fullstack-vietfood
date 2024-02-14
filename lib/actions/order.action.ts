'use server';
import { generateOrderId, handleResponse } from '../helpers/formater';
import { isAuthenticated } from './auth.action';
import prisma from '../prisma';
import { countryNameByIso, stateNameByIso } from './country.action';
import { revalidatePath } from 'next/cache';
import { createPaymentIntent } from './payment.action';
import { OrderStatus } from '@prisma/client';

/* ================================ */
// Cart actions
/* ================================ */
export const addToCard = async (params: AddToCart) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const { quantity, productId } = params;
		const userExist = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				cart: {
					select: {
						id: true,
					},
				},
				defaultAddress: true,
			},
		});
		if (!userExist) return handleResponse(false, `User doesn't exist`);

		const productExist = await prisma.product.findUnique({
			where: {
				id: productId,
			},
			select: {
				inventory: {
					select: {
						inStock: true,
						stockQTY: true,
						soldIndividual: true,
					},
				},
			},
		});
		if (!productExist)
			return handleResponse(false, `Product doesn't exist`);

		if (productExist.inventory && !productExist.inventory.inStock)
			return handleResponse(false, `Product is out of stock`);

		if (
			productExist.inventory &&
			productExist.inventory.soldIndividual &&
			quantity > 1
		)
			return handleResponse(
				false,
				`You cannot add more than one to your cart`,
			);

		const shippingDetails = await calculateShipping(isAuth.id);

		if (!userExist.cart || !userExist.cart.id) {
			await prisma.cart.create({
				data: {
					currency: 'usd',
					user: { connect: { id: isAuth.id } },
					...(userExist.defaultAddress && {
						address: {
							connect: { id: userExist.defaultAddress },
						},
					}),
					shippingCost: shippingDetails
						? shippingDetails.shippingCost
						: 0,
					shippingMethods: shippingDetails
						? shippingDetails.methodName
						: 'None',
					items: {
						create: {
							quantity,
							product: { connect: { id: productId } },
						},
					},
				},
			});

			revalidatePath('/order/cart');
			revalidatePath('/order/checkout');
			return handleResponse(true, `Product added to the cart`);
		}

		const isProductOnCart = await prisma.cartItem.findFirst({
			where: {
				cartId: userExist.cart?.id,
				productId,
			},
			select: {
				id: true,
				quantity: true,
			},
		});

		if (isProductOnCart) {
			await prisma.cart.update({
				where: {
					id: userExist.cart.id,
				},
				data: {
					...(userExist.defaultAddress && {
						address: {
							connect: { id: userExist.defaultAddress },
						},
					}),
					...(shippingDetails && {
						shippingCost: shippingDetails.shippingCost,
						shippingMethods: shippingDetails.methodName,
					}),
					items: {
						update: {
							where: {
								id: isProductOnCart.id,
							},
							data: {
								quantity: quantity + isProductOnCart.quantity,
							},
						},
					},
				},
			});
			return handleResponse(true, `Product quantity update`);
		}

		await prisma.cart.update({
			where: { id: userExist.cart?.id },
			data: {
				user: { connect: { id: isAuth.id } },
				...(userExist.defaultAddress && {
					address: {
						connect: { id: userExist.defaultAddress },
					},
				}),
				...(shippingDetails && {
					shippingCost: shippingDetails.shippingCost,
					shippingMethods: shippingDetails.methodName,
				}),
				items: {
					create: {
						quantity,
						product: { connect: { id: productId } },
					},
				},
			},
		});

		revalidatePath('/order/cart');
		revalidatePath('/order/checkout');
		return handleResponse(true, `Product added to the cart`);
	} catch (error) {
		return handleResponse(false, `Add to cart failed`);
	}
};
export const removeFromCart = async (params: { cartItemId: string }) => {
	try {
		// 1. User authentication
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		// 2. User exist or not
		const { cartItemId } = params;
		const isUser = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				cart: {
					select: {
						id: true,
					},
				},
			},
		});
		if (!isUser) return handleResponse(false, `User doesn't exist`);
		// 3. Cart exist or not
		if (!isUser.cart || !isUser.cart.id)
			return handleResponse(false, `Cart doesn't exist`);

		// 6. Remove that product from cart
		await prisma.cartItem.delete({
			where: {
				id: cartItemId,
			},
		});
		revalidatePath('/order/cart');
		return handleResponse(true, `Product removed from cart`);
	} catch (error) {
		return handleResponse(false, `Cart removed failed`);
	}
};
export const fetchCartDetails = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const cartList = await fetchCartList(isAuth.id);
		if (!cartList) return;
		const subtotal = cartSubtotal(cartList.cartItems);

		const shippingInfo = await calculateShipping(isAuth.id);

		const cartDetails = {
			summary: {
				subtotal,
				shippingCost: shippingInfo?.shippingCost || 0,
				taxCost: 0,
				total: subtotal + (shippingInfo?.shippingCost || 0) + 0,
			},
			items: cartList.cartItems,
		};
		return {
			...cartDetails,
		};
	} catch (error) {
		return;
	}
};
export const fetchCheckoutDetails = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const cartList = await fetchCartList(isAuth.id);

		if (!cartList) return;

		const shippingDetails = await calculateShipping(isAuth.id);
		if (!shippingDetails) return;
		const userCart = await prisma.cart.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				shippingCost: true,
			},
		});

		if (!userCart) return;

		const shippingCost = userCart.shippingCost ? userCart.shippingCost : 0;

		return {
			summary: {
				subtotal: shippingDetails.subtotal,
				shippingCost,
				taxCost: 0,
				total: shippingDetails.subtotal + shippingCost,
			},
			cartId: cartList.cartId,
			items: cartList.cartItems,
			addressList: shippingDetails.addressList,
		};
	} catch (error) {
		return;
	}
};
export const updateDefaultAddress = async (params: { addressId: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		await prisma.user.update({
			where: { id: isAuth.id },
			data: {
				defaultAddress: params.addressId,
				cart: {
					update: {
						address: {
							connect: { id: params.addressId },
						},
					},
				},
			},
		});

		revalidatePath('/order/checkout');
		return handleResponse(true, `Shipping address changed`);
	} catch (error) {
		return handleResponse(false, `Shipping address failed`);
	}
};
export const checkProductOnCart = async (params: {
	userId: string;
	productId: string;
}) => {
	try {
		const { userId, productId } = params;
		const product = await prisma.cartItem.findFirst({
			where: {
				productId,
				cart: {
					userId,
				},
			},
		});
		if (!product) return false;
		return true;
	} catch (error) {
		return false;
	}
};

/* ================================ */
// Order actions
/* ================================ */

export const createUserOrder = async (params: { cartId: string }) => {
	try {
		const { cartId } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return {
				success: false,
				id: null,
				message: 'Unauthorized access',
			};
		const cartDetails = await fetchCartList(isAuth.id);
		const cartExist = await prisma.cart.findUnique({
			where: { id: cartId, userId: isAuth.id },
			select: {
				id: true,
				shippingMethods: true,
				shippingCost: true,
				taxAmount: true,
				taxName: true,
				currency: true,
				address: true,
			},
		});
		if (!cartExist || !cartDetails)
			return {
				success: false,
				id: null,
				message: `Cart doesn't exist`,
			};

		if (!cartExist.address)
			return {
				success: false,
				id: null,
				message: 'Shipping address required',
			};

		const subTotal = cartSubtotal(cartDetails.cartItems);
		const totalAmount = subTotal + cartExist.shippingCost;

		const stripePayment = await createPaymentIntent({
			currency: cartExist.currency,
			total: totalAmount,
		});
		if (!stripePayment)
			return {
				success: false,
				id: null,
				message: 'Order created failed',
			};

		const orderId = generateOrderId();
		const newOrder = await prisma.order.create({
			data: {
				orderId,
				orderItem: cartDetails.cartItems.length,
				user: { connect: { id: isAuth.id } },
				status: 'PENDING',
				subTotal,
				tax: 0,
				totalDiscount: 0,
				shippingCost: cartExist.shippingCost,
				total: subTotal + cartExist.shippingCost,
				shippingInfo: {
					create: {
						firstName: cartExist.address?.contactName,
						lastName: '',
						mobile: `(${cartExist.address.phoneCode}) ${cartExist.address.phoneNumber}`,
						email: '',
						addressLine1: cartExist.address.addressLine1 || '',
						addressLine2: cartExist.address.addressLine2 || '',
						state: cartExist.address.stateCode,
						city: cartExist.address.cityName || '',
						country: cartExist.address.countryCode,
					},
				},
				payment: {
					create: {
						status: 'UNPAID',
						paymentIntentId: stripePayment.paymentIntent,
						clientSecret: stripePayment.clientSecret as string,
						currency: 'usd',
						amount: totalAmount,
					},
				},
				option: {
					create: {
						value: Buffer.from(
							JSON.stringify({
								orderItems: cartDetails.cartItems,
							}),
						),
					},
				},
			},
		});

		await prisma.cart.delete({
			where: {
				id: params.cartId,
			},
		});

		revalidatePath('/order/cart');
		revalidatePath('/order/checkout');

		return {
			success: true,
			id: newOrder.orderId,
			message: 'Your order has been created',
		};
	} catch (error) {
		return {
			success: false,
			id: null,
			message: 'Order created failed',
		};
	}
};
export const getOrderPaymentDetails = async (params: {
	orderId: string | null;
}) => {
	try {
		const { orderId } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth || !orderId) return;

		const order = await prisma.order.findUnique({
			where: { orderId },
			select: {
				id: true,
				orderId: true,
				total: true,
				payment: {
					select: {
						status: true,
						clientSecret: true,
						paymentIntentId: true,
					},
				},
			},
		});

		const publishKey = process.env.STRIPE_PUBLISH_KEY;
		if (!order || !publishKey) return;

		return {
			orderId: order.orderId,
			total: order.total,
			clientSecret: order.payment?.clientSecret,
			paymentIntent: order.payment?.paymentIntentId,
			publishKey,
			paymentStatus: order.payment?.status,
		};
	} catch (error) {
		return;
	}
};
export const fetchUserOrders = async (params: {
	page: number;
	pageSize: number;
	query: string | null;
	status: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query, status } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const orderData = await prisma.order.findMany({
			where: {
				userId: isAuth.id,
				...(query && {
					orderId: { contains: query },
				}),
				...(status && {
					status: status as OrderStatus,
				}),
			},
			select: {
				orderId: true,
				createdAt: true,
				orderItem: true,
				total: true,
				status: true,
				payment: {
					select: {
						status: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});

		const orders = orderData.map((item) => {
			return {
				orderDate: item.createdAt,
				orderId: item.orderId,
				orderStatus: item.status,
				paymentStatus: item.payment?.status,
				orderItems: item.orderItem,
				total: item.total,
				paymentLink: item.payment?.status === 'UNPAID' ? true : false,
			};
		});

		const countOrder = await prisma.order.count({
			where: {
				userId: isAuth.id,
				...(query && {
					orderId: { contains: query },
				}),
				...(status && {
					status: status as OrderStatus,
				}),
			},
		});

		return {
			orders,
			pages: Math.ceil(countOrder / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchUserOrderDetails = async (params: {
	orderId: string | null;
}) => {
	try {
		const { orderId } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth || !orderId) return;

		const orderItem = await prisma.order.findUnique({
			where: {
				orderId,
				userId: isAuth.id,
			},
			select: {
				orderId: true,
				createdAt: true,
				option: {
					select: {
						value: true,
					},
				},
				status: true,
				tax: true,
				shippingCost: true,
				total: true,
				totalDiscount: true,
				payment: {
					select: {
						status: true,
					},
				},
				shippingInfo: {
					select: {
						firstName: true,
						lastName: true,
						mobile: true,
						addressLine1: true,
						addressLine2: true,
						state: true,
						city: true,
						country: true,
					},
				},
			},
		});
		if (!orderItem) return;

		const orderDetailsString = orderItem.option.value.toString('utf-8');
		const orderDetails: OrderItemOptions = JSON.parse(orderDetailsString);

		const state = stateNameByIso(
			orderItem.shippingInfo?.state as string,
		)?.name;
		const city = orderItem.shippingInfo?.city;
		const country = countryNameByIso(
			orderItem.shippingInfo?.country as string,
		)?.name;

		return {
			orderDate: orderItem.createdAt,
			orderId: orderItem.orderId,
			items: orderDetails.orderItems,
			orderStatus: orderItem.status,
			paymentStaus: orderItem.payment?.status,
			summary: [
				{
					label: 'Tax',
					value: orderItem.tax,
				},
				{
					label: 'Shipping Cost',
					value: orderItem.shippingCost,
				},
				{
					label: 'Total Discount',
					value: orderItem.totalDiscount,
				},
				{
					label: 'Total Amount',
					value: orderItem.total,
				},
			],
			shipping: {
				name: `${orderItem.shippingInfo?.firstName} ${orderItem.shippingInfo?.lastName}`,
				mobile: orderItem.shippingInfo?.mobile,
				address: `${orderItem.shippingInfo?.addressLine1} ${orderItem.shippingInfo?.addressLine2} ${city}, ${state}, ${country}`,
			},
		};
	} catch (error) {
		return;
	}
};
/* ================================ */
// Calculate cost
/* ================================ */
export const calculateShipping = async (userId: string) => {
	const cartData = await fetchCartList(userId);
	if (!cartData) return;

	const subtotal = cartSubtotal(cartData.cartItems);
	let methodName: string = '';
	let maxCost = 0;
	let classCostList: ClassListCost[] = [];
	let shippingCost = 0;
	let isFreeShippingApplicable = false;

	const userAddress = await getShippingAddress();

	if (userAddress && userAddress.defaultAddress) {
		const matchZones = await prisma.shippingZoneLocation.findMany({
			where: {
				OR: [
					{
						locationCode: userAddress.defaultAddress.countryCode,
					},
					{
						locationCode: userAddress.defaultAddress.stateCode,
					},
				],
			},
			select: {
				locationCode: true,
				zone: {
					select: {
						methods: {
							select: {
								name: true,
								type: true,
								option: true,
							},
						},
					},
				},
			},
		});
		const findZones = matchZones.map((item) => {
			const flatMethod = item.zone.methods.filter(
				(item) => item.type === 'FLAT_RATE',
			);
			const freeMethod = item.zone.methods.filter(
				(item) => item.type === 'FREE_SHIPPING',
			);

			return {
				flatMethods: flatMethod.map((method) => {
					const jsonVal = method.option?.value.toString('utf-8');
					const optionValue: FlatMethodOptions = jsonVal
						? JSON.parse(jsonVal)
						: null;

					return {
						name: method.name,
						optionValue,
					};
				}),
				freeMethods: freeMethod.map((method) => {
					const jsonVal = method.option?.value.toString('utf-8');
					const optionValue: FreeMethodOptions = jsonVal
						? JSON.parse(jsonVal)
						: null;

					return {
						name: method.name,
						optionValue,
					};
				}),
			};
		});
		for (const cartItem of cartData.cartItems) {
			for (const method of findZones) {
				const applicableFlatMethods = method.flatMethods.map(
					(item) => ({
						name: item.name,
						cost: item.optionValue.cost,
						classList: item.optionValue.classList,
					}),
				);
				const applicableFreeMethods = method.freeMethods.map(
					(item) => ({
						name: item.name,
						required: item.optionValue.required,
						orderAmount:
							item.optionValue.required === 'MINI_ORDER_AMOUNT'
								? item.optionValue.miniOrderAmount
								: null,
					}),
				);

				for (const { name, cost, classList } of applicableFlatMethods) {
					if (cost > maxCost) {
						maxCost = cost;
						methodName = name;
						classCostList = classList;
					}
				}
				for (const {
					name,
					required,
					orderAmount,
				} of applicableFreeMethods) {
					if (
						required === 'MINI_ORDER_AMOUNT' &&
						orderAmount &&
						subtotal >= orderAmount
					) {
						methodName = name;
						isFreeShippingApplicable = true;
					}
				}
			}

			if (cartItem.shipClass && classCostList.length > 0) {
				const classExist = classCostList.find(
					(item) => item.classId === cartItem.shipClass?.id,
				);
				const classCost = classExist ? classExist.cost : 0;
				shippingCost = shippingCost + classCost;
			}
			shippingCost = shippingCost + maxCost;

			if (isFreeShippingApplicable) {
				shippingCost = 0;
			}
		}

		await prisma.cart.update({
			where: {
				id: cartData.cartId,
			},
			data: {
				shippingCost: shippingCost,
				shippingMethods: methodName,
			},
		});
	}
	return {
		shippingCost,
		methodName,
		subtotal,
		addressList: userAddress ? userAddress.addresses : null,
	};
};
export const getShippingAddress = async () => {
	try {
		// 1. Check authorization
		const isAuth = await isAuthenticated();
		if (!isAuth) return;
		// 2. Get the user default address ID
		const userExist = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				id: true,
				defaultAddress: true,
			},
		});
		if (!userExist) return;
		// 3. Check user have addresses or not
		const addressList = await prisma.address.findMany({
			where: {
				userId: userExist.id,
			},
			select: {
				id: true,
				contactName: true,
				phoneCode: true,
				phoneNumber: true,
				countryCode: true,
				stateCode: true,
				cityName: true,
				zipCode: true,
				addressLine1: true,
				addressLine2: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		if (!addressList.length) return;
		const addresses = addressList.map((item) => ({
			id: item.id,
			contactName: item.contactName,
			phoneNumber: `+${item.phoneCode} ${item.phoneNumber}`,
			country: countryNameByIso(item.countryCode)?.name,
			state: stateNameByIso(item.stateCode)?.name,
			city: item.cityName,
			zipCode: item.zipCode,
			address: `${item.addressLine1} ${item.addressLine2}`,
			defaultAddress:
				userExist?.defaultAddress === item.id ? true : false,
		}));

		// 4. Get the default address
		const defaultAddress = await prisma.address.findFirst({
			where: {
				id: userExist.defaultAddress as string,
			},
			select: {
				countryCode: true,
				stateCode: true,
			},
		});
		if (userExist.defaultAddress) {
			await prisma.user.update({
				where: { id: isAuth.id },
				data: {
					defaultAddress: userExist.defaultAddress,
					cart: {
						update: {
							address: {
								connect: { id: userExist.defaultAddress },
							},
						},
					},
				},
			});
		}

		return {
			defaultAddressID: userExist.defaultAddress,
			addresses,
			defaultAddress,
		};
	} catch (error) {
		return;
	}
};
export const fetchCartList = async (userId: string) => {
	const cartData = await prisma.cart.findUnique({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			shippingCost: true,
			taxName: true,
			items: {
				select: {
					id: true,
					quantity: true,
					product: {
						select: {
							name: true,
							shipClass: {
								select: {
									id: true,
									name: true,
								},
							},
							category: {
								select: {
									name: true,
								},
							},
							thumbnail: {
								select: {
									url: true,
									fileType: true,
								},
							},
							inventory: {
								select: {
									salePrice: true,
									regularPrice: true,
								},
							},
						},
					},
				},
			},
		},
	});

	if (!cartData) return;

	const cartItems = cartData.items.map((item) => ({
		cartItemId: item.id,
		quantity: item.quantity,
		name: item.product.name,
		shipClass: item.product.shipClass
			? {
					id: item.product.shipClass?.id,
					name: item.product.shipClass.name,
			  }
			: null,
		thumbnail: item.product.thumbnail
			? item.product.thumbnail.fileType === 'image'
				? item.product.thumbnail.url
				: null
			: null,
		category: item.product.category
			? item.product.category?.name
			: 'Uncategorized',
		unitPrice: item.product.inventory
			? item.product.inventory.salePrice
				? item.product.inventory.salePrice
				: item.product.inventory.regularPrice
				? item.product.inventory.regularPrice
				: 0
			: 0,
		totalCost: item.product.inventory
			? item.product.inventory.salePrice
				? item.product.inventory.salePrice * item.quantity
				: item.product.inventory.regularPrice
				? item.product.inventory.regularPrice * item.quantity
				: 0
			: 0,
	}));

	return { cartId: cartData.id, cartItems };
};
export const cartSubtotal = (cart: CartCustomItems[]) => {
	const subtotal = cart.reduce((acc, currentItem) => {
		return acc + currentItem.totalCost;
	}, 0);

	return subtotal;
};

/* ================================ */
// Admin actions for order
/* ================================ */
export const fetchOrdersByAdmin = async (params: {
	page: number;
	pageSize: number;
	query: string | null;
	status: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query, status } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const orderList = await prisma.order.findMany({
			where: {
				...(query && {
					user: {
						OR: [
							{ firstName: { contains: query } },
							{ lastName: { contains: query } },
						],
					},
				}),
				...(status && {
					status: status as OrderStatus,
				}),
			},
			select: {
				status: true,
				createdAt: true,
				total: true,
				orderId: true,
				orderItem: true,
				user: {
					select: {
						firstName: true,
						lastName: true,
						email: true,
						avatar: {
							select: {
								url: true,
							},
						},
					},
				},
				payment: {
					select: {
						status: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const orders = orderList.map((item) => ({
			name: `${item.user.firstName} ${item.user.lastName}`,
			email: item.user.email,
			avatar: item.user.avatar ? item.user.avatar.url : null,
			orderItems: item.orderItem,
			total: item.total,
			orderStatus: item.status,
			paymentStatus: item.payment?.status || 'UNPAID',
			orderCreated: item.createdAt,
			orderId: item.orderId,
		}));

		const countOrder = await prisma.order.count({
			where: {
				...(query && {
					user: {
						OR: [
							{ firstName: { contains: query } },
							{ lastName: { contains: query } },
						],
					},
				}),
				...(status && {
					status: status as OrderStatus,
				}),
			},
		});

		return {
			orders,
			pages: Math.ceil(countOrder / pageSize),
		};
	} catch (error) {
		return;
	}
};
