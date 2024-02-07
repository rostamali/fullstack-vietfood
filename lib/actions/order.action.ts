'use server';

import { handleResponse } from '../helpers/formater';
import { isAuthenticatedCheck } from './auth.action';
import prisma from '../prisma';
import { countryNameByIso, stateNameByIso } from './country.action';

export const addToCard = async (params: AddToCart) => {
	try {
		// 1. User authentication
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		// 2. User exist or not
		const { quantity, productId } = params;
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

		// 3. Product exist or not
		const isProduct = await prisma.product.findUnique({
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
		if (!isProduct) return handleResponse(false, `Product doesn't exist`);

		// 4. Product is stock or out of stock
		if (isProduct.inventory && !isProduct.inventory.inStock)
			return handleResponse(false, `Product is out of stock`);

		// 5. Produtc sold individual
		if (
			isProduct.inventory &&
			isProduct.inventory.soldIndividual &&
			quantity > 1
		)
			return handleResponse(
				false,
				`You cannot add more than one to your cart`,
			);

		// 6. if user had the cart then update or create
		if (!isUser.cart || !isUser.cart.id) {
			await prisma.cartItem.create({
				data: {
					quantity: quantity,
					cart: {
						create: {
							currency: 'usd',
							user: { connect: { id: isAuth.id } },
							isActive: true,
						},
					},
					product: { connect: { id: productId } },
				},
			});
		}

		// 7. Is selected product on cart or not if exist update qty
		const isProductOnCart = await prisma.cartItem.findFirst({
			where: {
				cartId: isUser.cart?.id,
				productId,
			},
			select: {
				id: true,
				quantity: true,
			},
		});

		if (isProductOnCart) {
			await prisma.cartItem.update({
				where: {
					id: isProductOnCart.id,
				},
				data: {
					quantity: quantity + isProductOnCart.quantity,
				},
			});
			return handleResponse(true, `Product quantity update`);
		}

		// 8. If not exist add the product to the cart
		await prisma.cartItem.create({
			data: {
				quantity: quantity,
				cart: { connect: { id: isUser.cart?.id } },
				product: { connect: { id: productId } },
			},
		});

		return handleResponse(true, `Product added to the cart`);
	} catch (error) {
		return handleResponse(false, `Cart action failed`);
	}
};
export const removeFromCart = async (params: { productId: string }) => {
	try {
		// 1. User authentication
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		// 2. User exist or not
		const { productId } = params;
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
		// 4. Check that cart have the specific product
		const isProductOnCart = await prisma.cartItem.findFirst({
			where: {
				cartId: isUser.cart?.id,
				productId,
			},
			select: {
				id: true,
				quantity: true,
			},
		});
		if (!isProductOnCart)
			return handleResponse(false, `Product not found in cart`);

		// 6. Remove that product from cart
		// await prisma.cartItem.delete({
		// 	where: {
		// 		cartId: isUser.cart?.id,
		// 		productId,
		// 	},
		// });
		return handleResponse(true, `Product removed from cart`);
	} catch (error) {
		return handleResponse(false, `Cart removed failed`);
	}
};
export const fetchCartItems = async () => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth) return;

		const cartData = await cartItems();
		if (!cartData) return;

		const subtotal = cartData.reduce((acc, currentItem) => {
			return acc + currentItem.totalCost;
		}, 0);
		const cartDetails = {
			summary: {
				subtotal: subtotal,
				shippingCost: 0,
				taxCost: 0,
				total: subtotal + 0 + 0,
			},
			items: cartData,
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
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth) return;
		const isUser = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				defaultAddress: true,
			},
		});
		if (!isUser) return;

		const defaultAddress = await prisma.address.findFirst({
			where: {
				id: isUser.defaultAddress as string,
			},
			select: {
				countryCode: true,
				stateCode: true,
			},
		});
		const addresses = await prisma.address.findMany({
			where: {
				userId: isAuth.id,
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
		});
		const addressList = addresses.map((item) => ({
			id: item.id,
			contactName: item.contactName,
			phoneNumber: `+${item.phoneCode} ${item.phoneNumber}`,
			country: countryNameByIso(item.countryCode)?.name,
			state: stateNameByIso(item.stateCode)?.name,
			city: item.cityName,
			zipCode: item.zipCode,
			address: `${item.addressLine1} ${item.addressLine2}`,
			defaultAddress: isUser?.defaultAddress === item.id ? true : false,
		}));

		const shippingDetails = await calculateShipping(defaultAddress);
		if (!shippingDetails) return;

		return {
			summary: {
				subtotal: shippingDetails.subtotal,
				shippingCost: shippingDetails?.shippingCost
					? shippingDetails.shippingCost
					: 0,
				taxCost: 0,
				total: shippingDetails.subtotal + shippingDetails.shippingCost,
			},
			items: shippingDetails.cartData,
			addressList,
		};
	} catch (error) {
		return;
	}
};

/* ================================ */
// Calculate cost
/* ================================ */
type CalShipParams = {
	countryCode: string;
	stateCode: string;
};
const calculateShipping = async (params: CalShipParams | null) => {
	if (params) {
		const matchZones = await prisma.shippingZoneLocation.findMany({
			where: {
				OR: [
					{
						locationCode: params.countryCode,
					},
					{
						locationCode: params.stateCode,
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
								options: true,
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
					const jsonVal = method.options?.value.toString('utf-8');
					const optionValue: FlatMethodOptions = jsonVal
						? JSON.parse(jsonVal)
						: null;

					return {
						name: method.name,
						optionValue,
					};
				}),
				freeMethods: freeMethod.map((method) => {
					const jsonVal = method.options?.value.toString('utf-8');
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

		const cartData = await cartItems();
		if (!cartData) return null;

		const subtotal = cartData.reduce((acc, currentItem) => {
			return acc + currentItem.totalCost;
		}, 0);

		let methodName: string;
		let maxCost = 0;
		let classCostList: ClassListCost[] = [];
		let shippingCost = 0;

		for (const cartItem of cartData) {
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
						maxCost = 0;
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
		}

		return {
			shippingCost,
			cartData,
			subtotal,
		};
	}
	return null;
};

const cartItems = async () => {
	const isAuth = await isAuthenticatedCheck();
	if (!isAuth) return;

	const cartData = await prisma.cart.findUnique({
		where: {
			userId: isAuth.id,
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

	if (!cartItems.length) return;

	return cartItems;
};
