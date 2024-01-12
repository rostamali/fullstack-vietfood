'use server';
import * as z from 'zod';
import { ProductFormSchema } from '../helpers/form-validation';
import { createSlug, handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import { AccountStatus, TaxStatus } from '@prisma/client';

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
			stockQty,
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
						stockQTY: stockQty ? stockQty : 0,
						inStock: stockStatus,
						threshold: threshold ? threshold : 2,
						soldIndividual,
					},
				},
			},
		});
		return {
			id: newProduct.id,
			message: `Product created successfully`
		}
	} catch (error) {
		return {
			id: null,
			message: `Product action failed`,
		};
	}
};
// name: '',
// 					excerpt: '',
// 					description: '',
// 					thumbnail: null,
// 					gallery: null,
// 					retailPrice: undefined,
// 					regularPrice: undefined,
// 					salePrice: undefined,
// 					taxStatus: 'NONE',
// 					taxClass: '',
// 					sku: '',
// 					stockQty: undefined,
// 					stockStatus: false,
// 					threshold: undefined,
// 					soldIndividual: false,
// 					weight: undefined,
// 					shipClass: '',
// 					status: '',
// 					category: null,
// 					brand: null,
// 					label: '',
