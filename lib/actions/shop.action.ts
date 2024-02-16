'use server';
import { revalidatePath } from 'next/cache';
import { handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import { isAuthenticated } from './auth.action';

export const fetchShopProducts = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const { page = 1, pageSize = 10, query } = params;
		const products = await prisma.product.findMany({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ excerpt: { contains: query } },
					],
				}),
				status: 'PUBLISH',
			},
			select: {
				id: true,
				name: true,
				slug: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						title: true,
						fileType: true,
					},
				},
				inventory: {
					select: {
						regularPrice: true,
						salePrice: true,
						inStock: true,
					},
				},
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countProduct = await prisma.product.count({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ excerpt: { contains: query } },
					],
				}),
			},
		});
		return {
			products,
			pages: Math.ceil(countProduct / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchProductBySlug = async (params: { slug: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;
		const product = await prisma.product.findFirst({
			where: {
				slug: params.slug,
			},
			select: {
				id: true,
				name: true,
				slug: true,
				excerpt: true,
				description: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						fileType: true,
					},
				},
				gallery: {
					select: {
						files: {
							select: {
								id: true,
								url: true,
								fileType: true,
							},
						},
					},
				},
				inventory: {
					select: {
						regularPrice: true,
						salePrice: true,
						inStock: true,
						sku: true,
					},
				},
				category: {
					select: {
						name: true,
					},
				},
				brand: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!product) return;

		const thumbnailImages = product?.thumbnail
			? [
					{
						id: product.thumbnail.id,
						url: product.thumbnail.url,
						fileType: product.thumbnail.fileType,
					},
			  ]
			: [];
		const galleryImages = product?.gallery?.files
			? product.gallery.files.map((file) => ({
					id: file.id,
					url: file.url,
					fileType: file.fileType,
			  }))
			: [];
		const gallery = [...thumbnailImages, ...galleryImages].reduce(
			(
				uniqueImages: { id: string; url: string; fileType: string }[],
				image,
			) => {
				const isDuplicate = uniqueImages.some(
					(uniqueImage) =>
						uniqueImage.id === image.id &&
						uniqueImage.fileType === image.fileType,
				);
				if (!isDuplicate) {
					uniqueImages.push(image);
				}
				return uniqueImages;
			},
			[],
		);

		const description = product.description
			? product.description.toString('utf-8')
			: null;

		return {
			id: product.id,
			name: product.name,
			excerpt: product.excerpt,
			description: description
				? JSON.parse(description)
				: JSON.parse(JSON.stringify({ blocks: [] })),
			gallery,
			inventory: {
				regularPrice: product.inventory?.regularPrice || null,
				salePrice: product.inventory?.salePrice || null,
				sku: product.inventory?.sku || null,
				inStock: product.inventory?.inStock || null,
			},
			category: product.category
				? product.category.name
				: 'Uncategorized',
			brand: product.brand ? product.brand.name : 'Unknown',
			shareLink: `${process.env.HOST}/product/${product.slug}`,
		};
	} catch (error) {
		return;
	}
};
export const getProductMetaDataBySlug = async (params: { slug: string }) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				slug: params.slug,
			},
			select: {
				name: true,
				excerpt: true,
				thumbnail: {
					select: {
						url: true,
					},
				},
			},
		});
		if (!product)
			return {
				name: `404 - Product not found`,
				excerpt: `Explore our wide range of food categories, featuring over so many products sourced from around the world and locally. Find specialty ingredients and quality products for your cooking needs.`,
				thumbnail: `/assets/seo/beef.jpg`,
			};
		return {
			name: product.name,
			excerpt: product.excerpt
				? product.excerpt
				: `Explore our wide range of food categories, featuring over so many products sourced from around the world and locally. Find specialty ingredients and quality products for your cooking needs.`,
			thumbnail: product.thumbnail
				? `/uploads/files/${product.thumbnail.url}`
				: `/assets/seo/beef.jpg`,
		};
	} catch (error) {
		return {
			name: `404 - Product not found`,
			excerpt: `Explore our wide range of food categories, featuring over so many products sourced from around the world and locally. Find specialty ingredients and quality products for your cooking needs.`,
			thumbnail: `/assets/seo/beef.jpg`,
		};
	}
};
export const fetchHomepageDetails = async () => {
	try {
		const bestSell = await prisma.product.findMany({
			where: {
				collection: 'BEST_SELLING',
			},
			select: {
				id: true,
				name: true,
				slug: true,
				collection: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						title: true,
						fileType: true,
					},
				},
				inventory: {
					select: {
						regularPrice: true,
						salePrice: true,
						inStock: true,
					},
				},
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});
		const newArrival = await prisma.product.findMany({
			where: {
				collection: 'NEW_ARRIVAL',
			},
			select: {
				id: true,
				name: true,
				slug: true,
				collection: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						title: true,
						fileType: true,
					},
				},
				inventory: {
					select: {
						regularPrice: true,
						salePrice: true,
						inStock: true,
					},
				},
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});
		const categories = await prisma.productCategory.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				thumbnail: {
					select: {
						fileName: true,
						fileType: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});

		return {
			newArrival: newArrival,
			bestSell: bestSell,
			categories,
		};
	} catch (error) {
		return;
	}
};
export const fetchCategoriesByUser = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;
		const { page = 1, pageSize = 10, query } = params;

		const categories = await prisma.productCategory.findMany({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ description: { contains: query } },
					],
				}),
			},
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						fileType: true,
						fileName: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countCategory = await prisma.productCategory.count({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ description: { contains: query } },
					],
				}),
			},
		});
		return {
			categories,
			pages: Math.ceil(countCategory / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchProductByCategory = async (params: {
	slug: string;
	page: number;
	pageSize: number;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;
		const { slug, page = 1, pageSize = 10, query } = params;

		const products = await prisma.product.findMany({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ excerpt: { contains: query } },
					],
				}),
				category: {
					slug,
				},
			},
			select: {
				id: true,
				name: true,
				slug: true,
				collection: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						title: true,
						fileType: true,
					},
				},
				inventory: {
					select: {
						regularPrice: true,
						salePrice: true,
						inStock: true,
					},
				},
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});

		if (!products) return;

		const countProduct = await prisma.product.count({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ excerpt: { contains: query } },
					],
				}),
				category: {
					slug,
				},
			},
		});

		return {
			products,
			pages: Math.ceil(countProduct / pageSize),
		};
	} catch (error) {
		return;
	}
};

/* ============= Wishlist actions ============= */
export const addProductToWishlist = async (params: { productId: string }) => {
	try {
		const { productId } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth) return handleResponse(false, `You don't have permission`);

		const wishlistExist = await prisma.wishlist.findUnique({
			where: { userId: isAuth.id },
		});

		if (wishlistExist) {
			const productOnWishlist = await prisma.productsOnWishlist.findFirst(
				{
					where: {
						wishlistId: wishlistExist.id,
						productId,
					},
				},
			);
			if (productOnWishlist)
				return handleResponse(true, `Item already added to wishlist`);

			await prisma.wishlist.update({
				where: { userId: isAuth.id },
				data: {
					products: {
						create: {
							product: { connect: { id: productId } },
						},
					},
				},
			});

			revalidatePath('/');

			return handleResponse(true, `Item added to wishlist`);
		}

		await prisma.wishlist.create({
			data: {
				user: { connect: { id: isAuth.id } },
				products: {
					create: {
						product: { connect: { id: productId } },
					},
				},
			},
		});
		revalidatePath('/');
		return handleResponse(true, `Item added to wishlist`);
	} catch (error) {
		return handleResponse(false, `Add to wishlist failed`);
	}
};
export const fetchWishlistProducts = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const wishlist = await prisma.wishlist.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				products: {
					select: {
						product: {
							select: {
								id: true,
								name: true,
								slug: true,
								collection: true,
								thumbnail: {
									select: {
										id: true,
										url: true,
										title: true,
										fileType: true,
									},
								},
								inventory: {
									select: {
										regularPrice: true,
										salePrice: true,
										inStock: true,
									},
								},
								createdAt: true,
							},
						},
					},
				},
			},
		});

		if (!wishlist) return;

		const products = wishlist.products.map((item) => item.product);

		return {
			products,
		};
	} catch (error) {
		return;
	}
};
export const removeProductFormWishlist = async (params: {
	productId: string;
}) => {
	try {
		const { productId } = params;

		const isAuth = await isAuthenticated();
		if (!isAuth) return handleResponse(false, `You don't have permission`);

		const productOnWishlist = await prisma.productsOnWishlist.findFirst({
			where: {
				wishlist: {
					userId: isAuth.id,
				},
				productId,
			},
		});
		if (!productOnWishlist)
			return handleResponse(false, `Product not exist on wishlist`);
		await prisma.productsOnWishlist.delete({
			where: {
				productId_wishlistId: {
					productId: productOnWishlist.productId,
					wishlistId: productOnWishlist.wishlistId,
				},
			},
		});
		revalidatePath('/user/wishlist');

		return handleResponse(true, `Item removed from wishlist`);
	} catch (error) {
		return handleResponse(false, `Remove action failed`);
	}
};

/* ============= Store Actions ============= */
export const fetchHeaderDetails = async () => {
	const isAuth = await isAuthenticated();

	if (isAuth) {
		const cart = await prisma.cart.findFirst({
			where: {
				userId: isAuth?.id,
			},
			select: {
				items: {
					select: {
						id: true,
					},
				},
			},
		});
		const wishlist = await prisma.wishlist.findFirst({
			where: {
				userId: isAuth?.id,
			},
			select: {
				products: {
					select: {
						productId: true,
					},
				},
			},
		});

		return {
			cart: {
				link: isAuth
					? `/order/cart`
					: `/auth/login?redirect=/order/cart`,
				count: cart ? cart.items.length : 0,
			},
			wishlist: {
				link: isAuth
					? `/user/wishlist`
					: `/auth/login?redirect=/user/wishlist`,
				count: wishlist ? wishlist.products.length : 0,
			},
			profileLink: isAuth
				? isAuth.role === 'ADMIN'
					? `/admin`
					: `/user/account`
				: `/auth/login?redirect=/user/account`,
		};
	}

	return {
		cart: {
			link: `/auth/login?redirect=/order/cart`,
			count: 0,
		},
		wishlist: {
			link: `/auth/login?redirect=/user/wishlist`,
			count: 0,
		},
		profileLink: `/auth/login?redirect=/user/account`,
	};
};
