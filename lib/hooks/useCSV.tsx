import { useMutation } from '@tanstack/react-query';
import { importUsersFromCSV } from '../actions/auth.action';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import { importCategoryFromCSV } from '../actions/category.action';
import { importBrandFromCSV } from '../actions/brand.action';
import { importProductFromCSV } from '../actions/product.action';

export const useUploadUser = () => {
	return useMutation({
		mutationFn: async (data: CSVUser[]) => {
			return await importUsersFromCSV(data);
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
export const useUploadCategory = () => {
	return useMutation({
		mutationFn: async (data: CSVCategory[]) => {
			return await importCategoryFromCSV(data);
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
export const useUploadBrand = () => {
	return useMutation({
		mutationFn: async (data: CSVBrand[]) => {
			return await importBrandFromCSV(data);
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
export const useUploadProduct = () => {
	return useMutation({
		mutationFn: async (data: CSVProduct[]) => {
			return await importProductFromCSV(data);
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
