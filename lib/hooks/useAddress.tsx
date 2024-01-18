import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createNewAddress,
	deleteAddress,
	fetchAddressDetails,
	updateAddress,
} from '../actions/address.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import * as z from 'zod';
import { AddressFormSchema } from '../helpers/form-validation';

export const useCreateAddress = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof AddressFormSchema>) => {
			return await createNewAddress(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
export const useUpdateAddress = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof AddressFormSchema>;
		}) => {
			return await updateAddress({
				id: data.id,
				data: data.values,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
export const useDeleteAddress = () => {
	return useMutation({
		mutationFn: async (data: { id: string }) => {
			return await deleteAddress({
				id: data.id,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
export const useAddressDetails = (id: string) => {
	return useQuery({
		queryKey: ['addressDetails', id],
		queryFn: async () => await fetchAddressDetails({ id }),
	});
};
