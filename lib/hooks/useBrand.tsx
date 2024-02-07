import { useMutation, useQuery } from '@tanstack/react-query';
import {
	brandDetailsById,
	createBrandByAdmin,
	fetchBrandList,
	updateBrandByAdmin,
} from '../actions/brand.action';
import { BrandFormSchema } from '../helpers/form-validation';
import * as z from 'zod';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';

export const useBrandList = () => {
	return useQuery({
		queryKey: ['brandSelectList'],
		queryFn: async () => await fetchBrandList(),
	});
};
export const useBrandDetailsById = (id: string) => {
	return useQuery({
		queryKey: ['brandDetails', id],
		queryFn: async () => await brandDetailsById({ id }),
	});
};
export const useCreateBrand = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof BrandFormSchema>) => {
			return await createBrandByAdmin(data);
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
export const useUpdateBrand = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof BrandFormSchema>;
		}) => {
			return await updateBrandByAdmin({
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
