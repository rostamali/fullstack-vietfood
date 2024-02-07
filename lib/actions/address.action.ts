'use server';
import * as z from 'zod';
import { handleResponse } from '../helpers/formater';
import { isAuthenticatedCheck } from './auth.action';
import prisma from '../prisma';
import { AddressFormSchema } from '../helpers/form-validation';
import { CountriesList } from '@/constants/countries';
import { revalidatePath } from 'next/cache';
import { countryNameByIso, stateNameByIso } from './country.action';

export const createNewAddress = async (
	params: z.infer<typeof AddressFormSchema>,
) => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const {
			contactName,
			phoneNumber,
			countryCode,
			stateCode,
			cityName,
			zipCode,
			addressLine1,
			addressLine2,
			setDefaultAddress,
		} = params;
		const getCountry = countryNameByIso(countryCode);
		if (!getCountry) return handleResponse(false, `Invalid country code`);

		const newAddress = await prisma.address.create({
			data: {
				contactName,
				phoneNumber,
				countryCode,
				stateCode,
				cityName,
				phoneCode: getCountry?.phonecode,
				zipCode,
				addressLine1,
				addressLine2,
				user: {
					connect: { id: isAuth.id },
				},
			},
		});

		const addresslegth = await prisma.address.findMany({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
			},
		});

		if (setDefaultAddress || addresslegth.length === 1) {
			await prisma.user.update({
				where: {
					id: isAuth.id,
				},
				data: {
					defaultAddress: newAddress.id,
				},
			});
		}

		revalidatePath('/user/address');
		return handleResponse(true, `Address created successfully`);
	} catch (error) {
		return handleResponse(false, `Address creation failed`);
	}
};
export const fetchAddresses = async () => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth) return;

		const address = await prisma.address.findMany({
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
		if (!address.length) return;

		const currentUser = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				defaultAddress: true,
			},
		});

		const addresses = address.map((item) => ({
			id: item.id,
			contactName: item.contactName,
			phoneNumber: `+${item.phoneCode} ${item.phoneNumber}`,

			country: countryNameByIso(item.countryCode)?.name,
			state: stateNameByIso(item.stateCode)?.name,
			city: item.cityName,
			zipCode: item.zipCode,
			address: `${item.addressLine1} ${item.addressLine2}`,
			defaultAddress:
				currentUser?.defaultAddress === item.id ? true : false,
		}));

		return addresses;
	} catch (error) {
		return;
	}
};
export const fetchAddressDetails = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth) return;

		const address = await prisma.address.findUnique({
			where: {
				id: params.id,
				userId: isAuth.id,
			},
			select: {
				id: true,
				contactName: true,
				phoneNumber: true,
				countryCode: true,
				stateCode: true,
				cityName: true,
				zipCode: true,
				addressLine1: true,
				addressLine2: true,
				user: {
					select: {
						defaultAddress: true,
					},
				},
			},
		});

		if (!address) return;

		return {
			...address,
			defaultAddress:
				address.user?.defaultAddress === address.id ? true : false,
		};
	} catch (error) {
		return;
	}
};
export const updateAddress = async (params: {
	id: string;
	data: z.infer<typeof AddressFormSchema>;
}) => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const addressExist = await prisma.address.findUnique({
			where: {
				id: params.id,
				userId: isAuth.id,
			},
			select: {
				id: true,
			},
		});
		if (!addressExist)
			return handleResponse(false, `Address does not exist`);

		const {
			contactName,
			phoneNumber,
			countryCode,
			stateCode,
			cityName,
			zipCode,
			addressLine1,
			addressLine2,
			setDefaultAddress,
		} = params.data;
		const getCountry = CountriesList.find(
			(item) => item.isoCode === countryCode,
		);
		if (!getCountry) return handleResponse(false, `Invalid country code`);

		const newAddress = await prisma.address.update({
			where: {
				id: params.id,
			},
			data: {
				contactName,
				phoneNumber,
				countryCode,
				stateCode,
				cityName,
				phoneCode: getCountry?.phonecode,
				zipCode,
				addressLine1,
				addressLine2,
			},
		});

		if (setDefaultAddress) {
			await prisma.user.update({
				where: {
					id: isAuth.id,
				},
				data: {
					defaultAddress: newAddress.id,
				},
			});
		}

		revalidatePath('/user/address');
		return handleResponse(true, `Address update successfully`);
	} catch (error) {
		return handleResponse(false, `Address action failed`);
	}
};
export const deleteAddress = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticatedCheck();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const addressExist = await prisma.address.findUnique({
			where: {
				id: params.id,
				userId: isAuth.id,
			},
			select: {
				id: true,
				user: {
					select: {
						defaultAddress: true,
					},
				},
			},
		});
		if (!addressExist)
			return handleResponse(false, `Address does not exist`);
		if (
			addressExist.user?.defaultAddress &&
			params.id === addressExist.user?.defaultAddress
		)
			return handleResponse(false, `Default address can't be deleted`);

		await prisma.address.delete({
			where: {
				id: params.id,
			},
		});
		revalidatePath('/user/address');
		return handleResponse(true, `Address deleted successfully`);
	} catch (error) {
		return handleResponse(false, `Address deleted failed`);
	}
};
