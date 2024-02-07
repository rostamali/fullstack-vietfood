import { useMutation, useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { TaxFormSchema } from '../helpers/form-validation';
import {
	createTaxRateByAdmin,
	deleteTaxRateByIds,
	fetchTaxDetailsById,
	updateTaxRateByAdmin,
} from '../actions/tax.action';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
// createTaxRateByAdmin
export const useCreateTax = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof TaxFormSchema>) => {
			return await createTaxRateByAdmin(data);
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
export const useUpdateTax = () => {
	return useMutation({
		mutationFn: async (data: {
			values: z.infer<typeof TaxFormSchema>;
			id: string | null;
		}) => {
			return await updateTaxRateByAdmin({
				data: data.values,
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
export const useDeleteTax = () => {
	return useMutation({
		mutationFn: async (data: { id: string }) => {
			return await deleteTaxRateByIds({
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
export const useTaxDetailsById = (id: string) => {
	return useQuery({
		queryKey: ['taxDetails', id],
		queryFn: async () => await fetchTaxDetailsById({ id }),
	});
};
