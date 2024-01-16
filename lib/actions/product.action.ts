'use server';
import * as z from 'zod';
import { ProductFormSchema } from '../helpers/form-validation';
import { createSlug, handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import { AccountStatus, TaxStatus } from '@prisma/client';
import { isAuthenticatedAdmin } from './auth.action';
import { revalidatePath } from 'next/cache';

export const createProductByAdmin = async (params: {
	data: z.infer<typeof ProductFormSchema>;
}) => {
	try {
		const {
			name,
			excerpt,
			description,
			thumbnail,
			gallery,
			retailPrice,
			regularPrice,
			salePrice,
			taxStatus,
			taxClass,
			sku,
			stockQTY,
			stockStatus,
			threshold,
			soldIndividual,
			weight,
			status,
			category,
			brand,
			label,
		} = params.data;
		const slug = await createSlug(name);
		const productExist = await prisma.product.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (productExist)
			return {
				id: null,
				message: `User different product name`,
			};
		const newProduct = await prisma.product.create({
			data: {
				name,
				slug,
				excerpt,
				description,
				status: status as AccountStatus,
				label,
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: thumbnail[0].id },
						},
					}),
				...(gallery &&
					gallery.length > 0 && {
						gallery: {
							create: {
								files: {
									connect: gallery.map((file) => ({
										id: file.id,
									})),
								},
							},
						},
					}),
				taxStatus: taxStatus as TaxStatus,
				taxClass,
				weight,
				inventory: {
					create: {
						retailPrice,
						regularPrice,
						salePrice,
						sku,
						stockQTY: stockQTY ? stockQTY : 0,
						inStock: stockStatus,
						threshold: threshold ? threshold : 2,
						soldIndividual,
					},
				},
				...(category && {
					category: {
						connect: { id: category.id },
					},
				}),
				...(brand && {
					brand: {
						connect: { id: brand.id },
					},
				}),
			},
		});
		revalidatePath('/admin/product');
		return {
			id: newProduct.id,
			message: `Product created successfully`,
		};
	} catch (error) {
		return {
			id: null,
			message: `Product action failed`,
		};
	}
};
export const fetchProductById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const product = await prisma.product.findUnique({
			where: {
				id: params.id,
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
						title: true,
						fileType: true,
						fileName: true,
						description: true,
					},
				},
				gallery: {
					select: {
						files: {
							select: {
								id: true,
								title: true,
								url: true,
								fileType: true,
							},
						},
					},
				},
				inventory: {
					select: {
						retailPrice: true,
						regularPrice: true,
						salePrice: true,
						sku: true,
						stockQTY: true,
						inStock: true,
						threshold: true,
						soldIndividual: true,
					},
				},
				taxStatus: true,
				taxClass: true,
				weight: true,
				shipClass: true,
				status: true,
				category: {
					select: {
						id: true,
						slug: true,
					},
				},
				brand: {
					select: {
						id: true,
						slug: true,
					},
				},
				label: true,
			},
		});
		if (!product) return;

		return {
			...product,
		};
	} catch (error) {
		return;
	}
};
export const updateProductByAdmin = async (params: {
	data: z.infer<typeof ProductFormSchema>;
	id: string;
}) => {
	try {
		const {
			name,
			excerpt,
			description,
			thumbnail,
			gallery,
			retailPrice,
			regularPrice,
			salePrice,
			taxStatus,
			taxClass,
			sku,
			stockQTY,
			stockStatus,
			threshold,
			soldIndividual,
			weight,
			status,
			category,
			brand,
			label,
		} = params.data;
		const slug = await createSlug(name);
		const productExist = await prisma.product.findFirst({
			where: {
				slug,
				id: {
					not: params.id,
				},
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (productExist)
			return handleResponse(false, `Product name already exist`);

		await prisma.product.update({
			where: {
				id: params.id,
			},
			data: {
				name,
				slug,
				excerpt,
				description,
				status: status as AccountStatus,
				label,
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: thumbnail[0].id },
						},
					}),
				...(!thumbnail && {
					thumbnail: {
						disconnect: true,
					},
				}),
				...(gallery &&
					gallery.length > 0 && {
						gallery: {
							upsert: {
								create: {
									files: {
										connect: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								update: {
									files: {
										set: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
							},
						},
					}),
				...(gallery &&
					gallery.length === 0 && {
						gallery: {
							upsert: {
								update: {
									files: {
										set: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								create: {},
							},
						},
					}),
				taxStatus: taxStatus as TaxStatus,
				taxClass,
				weight,
				inventory: {
					update: {
						retailPrice,
						regularPrice,
						salePrice,
						sku,
						stockQTY: stockQTY ? stockQTY : 0,
						inStock: stockStatus,
						threshold: threshold ? threshold : 2,
						soldIndividual,
					},
				},
				...(category && {
					category: {
						connect: { id: category.id },
					},
				}),
				...(brand && {
					brand: {
						connect: { id: brand.id },
					},
				}),
			},
		});
		return handleResponse(true, `Save changes done`);
	} catch (error) {
		return handleResponse(false, `Product update failed`);
	}
};
export const fetchProductByAdmin = async (params: {
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
			},
			select: {
				id: true,
				name: true,
				slug: true,
				status: true,
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
export const importProductFromCSV = async (params: CSVProduct[]) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return {
				success: true,
				message: `You don't have permission`,
			};

		for (const single of params) {
			const slug = await createSlug(single.name);
			let modifiedSlug = slug;
			let counter = 1;

			let pExist = await prisma.product.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (pExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				pExist = await prisma.product.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.product.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					status: 'ACTIVE',
					isActive: true,
					excerpt: single.excerpt,
					inventory: {
						create: {
							sku: single.sku,
							threshold: parseInt(single.threshold),
							retailPrice: parseInt(single.retailPrice),
							salePrice: parseInt(single.salePrice),
						},
					},
				},
			});
		}

		revalidatePath('/admin/product', 'page');

		return handleResponse(true, 'Product uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'Product upload failed');
	}
};

// Shop Actions
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
				status: 'ACTIVE',
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
			name: product.name,
			excerpt: product.excerpt,
			description: product.description,
			gallery,
			inventory: {
				regularPrice: product.inventory?.regularPrice || null,
				salePrice: product.inventory?.salePrice || null,
			},
		};
	} catch (error) {
		return;
	}
};
