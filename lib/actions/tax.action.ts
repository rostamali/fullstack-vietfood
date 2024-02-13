'use server';
import * as z from 'zod';
import { createSlug, handleResponse } from '../helpers/formater';
import { isAuthenticated } from './auth.action';
import { TaxFormSchema } from '../helpers/form-validation';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export const createTaxRateByAdmin = async (
	params: z.infer<typeof TaxFormSchema>,
) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const { name, country, state, zipCode, taxRate, priority } = params;
		const slug = await createSlug(name);
		const slugExist = await prisma.taxRate.findFirst({
			where: { slug },
			select: { id: true, slug: true },
		});
		if (slugExist) return handleResponse(false, `Tax name already exist`);

		const zipCodeArray = zipCode.split(';');
		await prisma.taxRate.create({
			data: {
				name,
				slug,
				country,
				state,
				taxRate,
				priority,
				...(zipCode.length > 0 && {
					taxLocations: {
						create: zipCodeArray.map((code) => ({
							locationCode: code,
							locationType: 'ZIPCODE',
						})),
					},
				}),
			},
		});
		revalidatePath('/admin/store/tax');
		return handleResponse(true, `Tax rate created successfully`);
	} catch (error) {
		return handleResponse(false, `Tax creation failed`);
	}
};
export const fetchTaxRateByAdmin = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const { page = 1, pageSize = 10, query } = params;
		const taxRates = await prisma.taxRate.findMany({
			where: {
				...(query && {
					name: { contains: query },
				}),
			},
			select: {
				id: true,
				name: true,
				country: true,
				state: true,
				taxRate: true,
				priority: true,
				taxLocations: {
					select: {
						locationCode: true,
					},
				},
			},
			orderBy: {
				priority: 'asc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countRate = await prisma.taxRate.count({
			where: {
				...(query && {
					name: { contains: query },
				}),
			},
		});
		return {
			taxRates,
			pages: Math.ceil(countRate / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchTaxDetailsById = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const taxRate = await prisma.taxRate.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				country: true,
				state: true,
				taxRate: true,
				priority: true,
				name: true,
				taxLocations: {
					select: {
						locationCode: true,
					},
				},
			},
		});
		if (!taxRate) return;

		return {
			...taxRate,
		};
	} catch (error) {
		return;
	}
};
export const updateTaxRateByAdmin = async (params: {
	data: z.infer<typeof TaxFormSchema>;
	id: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);
		const {
			data: { name, taxRate, country, state, priority, zipCode },
			id,
		} = params;
		if (!id) return handleResponse(false, `Tax ID is required`);

		const slug = await createSlug(params.data.name);
		const taxExist = await prisma.taxRate.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});
		if (!taxExist) return handleResponse(false, `Tax ID does not exist`);

		const slugExist = await prisma.taxRate.findFirst({
			where: {
				slug,
				id: {
					not: taxExist.id,
				},
			},
			select: {
				id: true,
			},
		});
		if (slugExist) return handleResponse(false, `Tax name already exist`);

		const zipCodeArray = zipCode.split(';');

		await prisma.taxRate.update({
			where: {
				id: taxExist.id,
			},
			data: {
				name,
				slug,
				country,
				state,
				taxRate,
				priority,
				...(zipCode.length > 0
					? {
							taxLocations: {
								deleteMany: {},
								create: zipCodeArray.map((code) => ({
									locationCode: code,
									locationType: 'ZIPCODE',
								})),
							},
					  }
					: {
							taxLocations: {
								deleteMany: {},
							},
					  }),
			},
		});
		revalidatePath('/admin/store/tax');
		return handleResponse(true, `Tax rate update successfully`);
	} catch (error) {
		return handleResponse(false, `Tax update failed`);
	}
};
export const deleteTaxRateByIds = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		await prisma.taxRateLocation.deleteMany({
			where: {
				taxId: params.id,
			},
		});
		await prisma.taxRate.delete({
			where: {
				id: params.id,
			},
		});

		revalidatePath('/admin/store/tax');
		return handleResponse(true, `Tax rate deleted`);
	} catch (error) {
		return handleResponse(false, `Tax rate delete failed`);
	}
};
