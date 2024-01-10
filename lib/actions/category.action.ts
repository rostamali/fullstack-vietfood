'use server';
import { revalidatePath } from 'next/cache';
import { createSlug, handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import { isAuthenticatedAdmin } from './auth.action';

export const createCategoryByAdmin = async (params: {
	name: string;
	description: string;
	parent: string | null;
	thumbnail: FileSelection[] | null;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const { name, description, thumbnail, parent } = params;
		const slug = await createSlug(name);
		const categoryExist = await prisma.productCategory.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (categoryExist)
			return handleResponse(false, 'Category already exist');

		let parentCategoryId: string | null = null;
		if (parent) {
			const parentCategory = await prisma.productCategory.findFirst({
				where: {
					slug: parent,
				},
				select: {
					id: true,
				},
			});

			if (!parentCategory) {
				return handleResponse(false, 'Parent category not found');
			}
			parentCategoryId = parentCategory.id;
		}

		await prisma.productCategory.create({
			data: {
				name,
				slug,
				description,
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: {
								id: thumbnail[0].id,
							},
						},
					}),
				...(parentCategoryId && {
					parentCategory: {
						connect: { id: parentCategoryId },
					},
				}),
			},
		});

		revalidatePath('/admin/product/category', 'page');
		return handleResponse(true, 'Category created successfully');
	} catch (error) {
		return handleResponse(false, 'Category creation failed');
	}
};
export const updateCategoryByAdmin = async (params: {
	data: CategoryForm;
	id: string;
}) => {
	try {
		const { name, description, thumbnail, parent } = params.data;
		const categoryExist = await prisma.productCategory.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
			},
		});
		if (!categoryExist)
			return handleResponse(false, `Category doesn't exist`);

		const slug = await createSlug(name);
		const slugExist = await prisma.productCategory.findFirst({
			where: {
				slug,
				id: {
					not: categoryExist.id,
				},
			},
			select: {
				id: true,
			},
		});
		if (slugExist)
			return handleResponse(false, `Category name already exist`);

		let parentCategoryId: string | null = null;
		if (parent) {
			const parentCategory = await prisma.productCategory.findFirst({
				where: {
					slug: parent,
				},
				select: {
					id: true,
				},
			});

			if (!parentCategory) {
				return handleResponse(false, 'Parent category not found');
			}
			parentCategoryId = parentCategory.id;
		}

		await prisma.productCategory.update({
			where: {
				id: categoryExist.id,
			},
			data: {
				slug,
				name,
				description,
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
				...(parentCategoryId
					? {
							parentCategory: {
								connect: {
									id: parentCategoryId,
								},
							},
					  }
					: {
							parentCategory: {
								disconnect: true,
							},
					  }),
			},
		});

		revalidatePath('/admin/product/category', 'page');
		return handleResponse(true, 'Category updated successfully');
	} catch (error) {
		return handleResponse(false, 'Category update failed');
	}
};
export const fetchCategoryByAdmin = async (params: {
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
						title: true,
						fileType: true,
						fileName: true,
						description: true,
					},
				},
				isActive: true,
				parentCategory: {
					select: {
						name: true,
						slug: true,
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
export const fetchCategoryList = async () => {
	try {
		const categories = await prisma.productCategory.findMany({
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
			data: categories,
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};
export const importCategoryFromCSV = async (params: CSVCategory[]) => {
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

			let catExist = await prisma.productCategory.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (catExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				catExist = await prisma.productCategory.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.productCategory.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					description: single.description,
				},
			});
		}

		revalidatePath('/admin/product/category', 'page');

		return handleResponse(true, 'Category uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'Category upload failed');
	}
};
