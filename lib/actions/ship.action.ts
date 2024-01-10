'use server';

import { createSlug, handleResponse } from '../helpers/formater';
import { isAuthenticatedAdmin } from './auth.action';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { MethodType, TaxStatus } from '@prisma/client';

/* ================================== */
// Shipping class actions
/* ================================== */
export const createShipClassByAdmin = async (params: ShipClassForm) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const { name, description } = params;
		const slug = await createSlug(name);
		const classExist = await prisma.shippingClass.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (classExist)
			return handleResponse(false, `Class name already exist`);

		await prisma.shippingClass.create({
			data: {
				name,
				slug,
				description,
			},
		});
		revalidatePath('/admin/shipping/class', 'page');
		return handleResponse(true, `Class created successfully`);
	} catch (error) {
		return handleResponse(false, `Shipping class creation failed`);
	}
};
export const updateShipClassByAdmin = async (params: {
	data: ShipClassForm;
	id: string;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);
		const { name, description } = params.data;
		const classExist = await prisma.shippingClass.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
			},
		});
		if (!classExist) return handleResponse(false, `Class doesn't exist`);

		const slug = await createSlug(name);
		const slugExist = await prisma.shippingClass.findFirst({
			where: {
				slug,
				id: {
					not: classExist.id,
				},
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (slugExist) return handleResponse(false, `Class name already exist`);

		await prisma.shippingClass.update({
			where: {
				id: classExist.id,
			},
			data: {
				name,
				slug,
				description,
			},
		});
		revalidatePath('/admin/shipping/class', 'page');
		return handleResponse(true, `Class updated successfully`);
	} catch (error) {
		return handleResponse(false, `Class update failed`);
	}
};
export const fetchShipClassByAdmin = async (params: {
	pageSize: number;
	page: number;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10 } = params;
		const shipClass = await prisma.shippingClass.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countClass = await prisma.shippingClass.count();

		return {
			shipClass,
			pages: Math.ceil(countClass / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const deleteShipClassByAdmin = async (params: {
	classIds: string[];
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		await prisma.shippingClass.deleteMany({
			where: {
				id: {
					in: params.classIds,
				},
			},
		});
		revalidatePath('/admin/shipping/class', 'page');
		return handleResponse(true, `Class deleted successfully`);
	} catch (error) {
		return handleResponse(false, `Class deletion failed`);
	}
};
export const classListForFlatMethods = async () => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;
		const shipClass = await prisma.shippingClass.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return shipClass;
	} catch (error) {
		return;
	}
};

/* ================================== */
// Shipping methods actions
/* ================================== */
export const createMethodByAdmin = async (params: {
	type: string;
	method: ShipMethodsForm;
	options: any;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const { type, method, options } = params;

		await prisma.shippingMethod.create({
			data: {
				name: method.name,
				taxStatus: method.taxStatus as TaxStatus,
				type: type as MethodType,
				active: true,
				order: 1,
				options: {
					create: {
						value: JSON.stringify(options),
					},
				},
			},
		});
		revalidatePath('/admin/shipping/methods');
		return handleResponse(true, `Method created successfullt`);
	} catch (error) {
		return handleResponse(false, `Method creation failed`);
	}
};
export const fetchMethodByAdmin = async (params: {
	pageSize: number;
	page: number;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10 } = params;
		const methods = await prisma.shippingMethod.findMany({
			select: {
				id: true,
				name: true,
				taxStatus: true,
				type: true,
				active: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});

		const countMethod = await prisma.shippingMethod.count();
		return {
			methods,
			pages: Math.ceil(countMethod / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const deleteMethodByAdmin = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const methodExist = await prisma.shippingMethod.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
			},
		});
		if (!methodExist) return handleResponse(false, `Method doesn't exist`);

		await prisma.options.delete({
			where: {
				methodId: methodExist.id,
			},
		});
		await prisma.shippingMethod.delete({
			where: {
				id: params.id,
			},
		});
		revalidatePath('/admin/shipping/methods', 'page');
		return handleResponse(true, `Method deleted successfully`);
	} catch (error) {
		return handleResponse(false, `Method delete action failed`);
	}
};
