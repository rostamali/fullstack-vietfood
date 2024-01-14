'use server';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { createSlug, handleResponse } from '../helpers/formater';
import { isAuthenticatedAdmin } from './auth.action';
import prisma from '../prisma';
import { BrandFormSchema } from '../helpers/form-validation';

export const createBrandByAdmin = async (
	params: z.infer<typeof BrandFormSchema>,
) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const {
			name,
			description,
			thumbnail,
			contactName,
			contactEmail,
			contactPhone,
			contactWebsite,
		} = params;
		const slug = await createSlug(name);
		const brandExist = await prisma.brand.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (brandExist) return handleResponse(false, 'Brand already exist');

		await prisma.brand.create({
			data: {
				name,
				slug,
				description,
				contactName,
				contactEmail,
				contactPhone,
				contactWebsite,
				isActive: true,
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: {
								id: thumbnail[0].id,
							},
						},
					}),
			},
		});

		revalidatePath('/admin/product/Brand', 'page');
		return handleResponse(true, 'Brand created successfully');
	} catch (error) {
		return handleResponse(false, 'Brand creation failed');
	}
};
export const updateBrandByAdmin = async (params: {
	data: z.infer<typeof BrandFormSchema>;
	id: string;
}) => {
	try {
		const {
			name,
			description,
			thumbnail,
			contactName,
			contactEmail,
			contactPhone,
			contactWebsite,
		} = params.data;
		const brandExist = await prisma.brand.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
			},
		});
		if (!brandExist) return handleResponse(false, `Brand doesn't exist`);

		const slug = await createSlug(name);
		const slugExist = await prisma.brand.findFirst({
			where: {
				slug,
				id: {
					not: brandExist.id,
				},
			},
			select: {
				id: true,
			},
		});
		if (slugExist) return handleResponse(false, `Brand name already exist`);

		await prisma.brand.update({
			where: {
				id: brandExist.id,
			},
			data: {
				slug,
				name,
				description,
				contactName,
				contactEmail,
				contactPhone,
				contactWebsite,
				...(thumbnail
					? thumbnail.length > 0 && {
							thumbnail: {
								connect: {
									id: thumbnail[0].id,
								},
							},
					  }
					: {
							thumbnail: {
								disconnect: true,
							},
					  }),
			},
		});

		revalidatePath('/admin/product/brand', 'page');
		return handleResponse(true, 'Brand updated successfully');
	} catch (error) {
		return handleResponse(false, 'Brand update failed');
	}
};
export const fetchBrandByAdmin = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query } = params;
		const brands = await prisma.brand.findMany({
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
						title: true,
						fileType: true,
						fileName: true,
						description: true,
					},
				},
				isActive: true,
				contactName: true,
				contactEmail: true,
				contactPhone: true,
				contactWebsite: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countBrand = await prisma.brand.count({
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
			brands,
			pages: Math.ceil(countBrand / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const brandDetailsById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const brand = await prisma.brand.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
				contactName: true,
				contactEmail: true,
				contactPhone: true,
				contactWebsite: true,
				description: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						fileType: true,
						title: true,
					},
				},
			},
		});
		if (!brand) return;
		return {
			...brand,
		};
	} catch (error) {
		return;
	}
};
export const importBrandFromCSV = async (params: CSVBrand[]) => {
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

			let brandExist = await prisma.brand.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (brandExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				brandExist = await prisma.brand.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.brand.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					description: single.description,
					contactName: single.contactName,
					contactEmail: single.contactEmail,
					contactPhone: single.contactPhone,
					contactWebsite: single.contactWebsite,
				},
			});
		}

		revalidatePath('/admin/product/brand', 'page');

		return handleResponse(true, 'Brand uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'Brand upload failed');
	}
};
export const fetchBrandList = async () => {
	try {
		const brands = await prisma.brand.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return {
			brands,
		};
	} catch (error) {
		return;
	}
};
