'use server';
import prisma from '../prisma';

export const fetchShopProducts = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
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
		const product = await prisma.product.findFirst({
			where: {
				slug: params.slug,
			},
			select: {
				id: true,
				name: true,
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

		return {
			id: product.id,
			name: product.name,
			excerpt: product.excerpt,
			description: product.description,
			gallery,
			inventory: {
				regularPrice: product.inventory?.regularPrice || null,
				salePrice: product.inventory?.salePrice || null,
				sku: product.inventory?.sku || null,
				inStock: product.inventory?.inStock || null,
			},
		};
	} catch (error) {
		return;
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
