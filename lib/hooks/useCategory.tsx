import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createCategoryByAdmin,
	deleteCategoryByAdmin,
	fetchCategoryDetails,
	fetchCategoryList,
	updateCategoryByAdmin,
} from '../actions/category.action';
import { toast } from 'sonner';
import * as z from 'zod';
import { CategoryFormSchema } from '../helpers/form-validation';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';

export const useCreateCategory = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof CategoryFormSchema>) => {
			return await createCategoryByAdmin(data);
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
export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof CategoryFormSchema>;
		}) => {
			return await updateCategoryByAdmin({
				id: data.id,
				data: data.values,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({
					queryKey: ['categoryDetails'],
				});
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
export const useCategoryDetails = (id: string) => {
	return useQuery({
		queryKey: ['categoryDetails', id],
		queryFn: async () => await fetchCategoryDetails({ id }),
	});
};
export const useCategoryList = () => {
	return useQuery({
		queryKey: ['categorySelectList'],
		queryFn: async () => await fetchCategoryList(),
	});
};
export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: string[]) => {
			return await deleteCategoryByAdmin({
				catIds: data,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({
					queryKey: ['categoryDetails'],
				});
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
