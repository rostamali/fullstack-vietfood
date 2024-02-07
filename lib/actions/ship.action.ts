'use server';
import * as z from 'zod';
import { createSlug, handleResponse } from '../helpers/formater';
import { isAuthenticatedAdmin } from './auth.action';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { LocationType, MethodType, TaxStatus } from '@prisma/client';
import { ShipClassSchema, ShipFormSchema } from '../helpers/form-validation';
import { CountriesList } from '@/constants/countries';
import { StatesList } from '@/constants/countries/states';

/* ================================== */
// Shipping class actions
/* ================================== */
export const createShipClassByAdmin = async (
	params: z.infer<typeof ShipClassSchema>,
) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const { name, description } = params;

		await prisma.shippingClass.create({
			data: {
				name,
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
	data: z.infer<typeof ShipClassSchema>;
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

		await prisma.shippingClass.update({
			where: {
				id: classExist.id,
			},
			data: {
				name,
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
export const fetchShipClassList = async () => {
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
// Shipping zone actions
/* ================================== */
export const createShipZoneByAdmin = async (
	params: z.infer<typeof ShipFormSchema>,
) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);
		const { name, regions, flatMethod, freeMethod, pickupMethod } = params;

		const newZone = await prisma.shippingZone.create({
			data: {
				name,
				...(regions &&
					regions.length > 0 && {
						regions: {
							create: regions.map((region) => ({
								locationCode: region.isoCode,
								locationType: region.type as LocationType,
							})),
						},
					}),
			},
		});
		if (flatMethod && flatMethod.length > 0) {
			for (const method of flatMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: method.taxStatus as TaxStatus,
						type: 'FLAT_RATE' as MethodType,
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										cost: method.cost,
										classList: method.classList,
									}),
								),
							},
						},
						zone: {
							connect: { id: newZone.id },
						},
					},
				});
			}
		}
		if (freeMethod && freeMethod.length > 0) {
			for (const method of freeMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: 'NONE',
						type: 'FREE_SHIPPING',
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										required: method.required,
										miniOrderAmount: method.miniOrderAmount,
									}),
								),
							},
						},
						zone: {
							connect: { id: newZone.id },
						},
					},
				});
			}
		}
		if (pickupMethod && pickupMethod.length > 0) {
			for (const method of pickupMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: method.taxStatus as TaxStatus,
						type: 'LOCAL_PICKUP',
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										cost: method.cost,
									}),
								),
							},
						},
						zone: {
							connect: { id: newZone.id },
						},
					},
				});
			}
		}
		revalidatePath('/admin/store/shipping');
		return handleResponse(true, `Zone created successfullt`);
	} catch (error) {
		return handleResponse(false, `Zone creation failed`);
	}
};
export const fetchShipZoneByAdmin = async (params: {
	pageSize: number;
	page: number;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10 } = params;
		const zonesList = await prisma.shippingZone.findMany({
			select: {
				id: true,
				name: true,
				regions: {
					select: {
						locationCode: true,
						locationType: true,
					},
				},
				methods: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});

		const countZone = await prisma.shippingZone.count();

		const zones = zonesList.map((zone) => ({
			id: zone.id,
			name: zone.name,
			regions: zone.regions.map((region) => {
				const name =
					region.locationType === 'COUNTRY'
						? CountriesList.find(
								(country) =>
									country.isoCode === region.locationCode,
						  )?.name
						: StatesList.find(
								(state) =>
									state.isoCode === region.locationCode,
						  )?.name;

				return {
					name: name || region.locationCode, // Fallback to locationCode if full name not found
					locationType: region.locationType,
				};
			}),
			methods: zone.methods,
		}));

		return {
			zones,
			pages: Math.ceil(countZone / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchZoneDetailsById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const shipZone = await prisma.shippingZone.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
				regions: {
					select: {
						locationCode: true,
						locationType: true,
					},
				},
				methods: {
					select: {
						name: true,
						taxStatus: true,
						type: true,
						options: {
							select: {
								value: true,
							},
						},
					},
				},
			},
		});
		if (!shipZone) return;

		const currentClass = await prisma.shippingClass.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const flatMethod = shipZone.methods.filter(
			(item) => item.type === 'FLAT_RATE',
		);
		const freeMethod = shipZone.methods.filter(
			(item) => item.type === 'FREE_SHIPPING',
		);
		const pickupMethod = shipZone.methods.filter(
			(item) => item.type === 'LOCAL_PICKUP',
		);

		const transformedData = {
			id: shipZone.id,
			name: shipZone.name,
			regions: shipZone.regions.map((region) => ({
				type: region.locationType as LocationType,
				isoCode: region.locationCode,
			})),
			flatMethod: flatMethod.map((method) => {
				const jsonString = method.options?.value.toString('utf-8');
				const optionsValue = jsonString ? JSON.parse(jsonString) : null;

				return {
					name: method.name,
					taxStatus: method.taxStatus,
					cost: optionsValue?.cost || undefined,
					classList: currentClass.map((shipClass) => {
						const matchingClassItem = optionsValue?.classList.find(
							(classItem: {
								classId: string;
								className: string;
								cost: number;
							}) => classItem.classId === shipClass.id,
						);
						return {
							classId: shipClass.id,
							className: shipClass.name,
							cost: matchingClassItem
								? matchingClassItem.cost
								: undefined,
						};
					}),
				};
			}),
			freeMethod: freeMethod.map((method) => {
				const jsonString = method.options?.value.toString('utf-8');
				const optionsValue = jsonString ? JSON.parse(jsonString) : null;
				return {
					name: method.name,
					required: optionsValue.required,
					miniOrderAmount: optionsValue.miniOrderAmount || undefined,
				};
			}),
			pickupMethod: pickupMethod.map((method) => {
				const jsonString = method.options?.value.toString('utf-8');
				const optionsValue = jsonString ? JSON.parse(jsonString) : null;
				return {
					name: method.name,
					taxStatus: method.taxStatus,
					cost: optionsValue.cost || undefined,
				};
			}),
		};

		return {
			...transformedData,
		};
	} catch (error) {
		return;
	}
};
export const updateShipZoneByAdmin = async (params: {
	id: string;
	data: z.infer<typeof ShipFormSchema>;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const {
			id,
			data: { name, regions, flatMethod, pickupMethod, freeMethod },
		} = params;
		const zoneExist = await prisma.shippingZone.findUnique({
			where: {
				id,
			},
		});
		if (!zoneExist) return handleResponse(false, `Zone doesn't exist`);
		await prisma.shippingZone.update({
			where: {
				id: zoneExist.id,
			},
			data: {
				name,
				...(regions &&
					regions.length > 0 && {
						regions: {
							deleteMany: {},
							create: regions.map((region) => ({
								locationCode: region.isoCode,
								locationType: region.type as LocationType,
							})),
						},
					}),
				...(regions &&
					regions.length === 0 && {
						regions: {
							deleteMany: {},
						},
					}),
				methods: {
					deleteMany: {},
				},
			},
		});
		if (flatMethod && flatMethod.length > 0) {
			for (const method of flatMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: method.taxStatus as TaxStatus,
						type: 'FLAT_RATE' as MethodType,
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										cost: method.cost,
										classList: method.classList,
									}),
								),
							},
						},
						zone: {
							connect: { id: zoneExist.id },
						},
					},
				});
			}
		}
		if (freeMethod && freeMethod.length > 0) {
			for (const method of freeMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: 'NONE',
						type: 'FREE_SHIPPING',
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										required: method.required,
										miniOrderAmount: method.miniOrderAmount,
									}),
								),
							},
						},
						zone: {
							connect: { id: zoneExist.id },
						},
					},
				});
			}
		}
		if (pickupMethod && pickupMethod.length > 0) {
			for (const method of pickupMethod) {
				await prisma.shippingMethod.create({
					data: {
						name: method.name,
						taxStatus: method.taxStatus as TaxStatus,
						type: 'LOCAL_PICKUP',
						active: true,
						options: {
							create: {
								value: Buffer.from(
									JSON.stringify({
										cost: method.cost,
									}),
								),
							},
						},
						zone: {
							connect: { id: zoneExist.id },
						},
					},
				});
			}
		}
		revalidatePath('/admin/store/shipping');
		return handleResponse(true, `Zone updated successfullt`);
	} catch (error) {
		return handleResponse(false, `Zone update failed`);
	}
};
export const deleteShipZoneByAdmin = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		await prisma.shippingZone.delete({
			where: {
				id: params.id,
			},
		});
		revalidatePath('/admin/store/shipping');
		return handleResponse(true, `Zone deleted successfully`);
	} catch (error) {
		return handleResponse(false, `Zone delete failed`);
	}
};
