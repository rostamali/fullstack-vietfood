'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	addProductToWishlist,
	removeProductFormWishlist,
	searchGlobalProducts,
	submitContactForm,
} from '../actions/shop.action';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import { ContactFormSchema } from '../helpers/form-validation';
import { z } from 'zod';

export const useAddToWishlist = () => {
	return useMutation({
		mutationFn: async (data: { productId: string }) => {
			return await addProductToWishlist(data);
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
export const useRemoveFromWishlist = () => {
	return useMutation({
		mutationFn: async (data: { productId: string }) => {
			return await removeProductFormWishlist(data);
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
export const useGlobalProductSearch = (query: string | null) => {
	return useQuery({
		queryKey: ['globalProducts', query],
		queryFn: async () => await searchGlobalProducts({ query }),
	});
};
export const useSubmitContactForm = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ContactFormSchema>) => {
			return await submitContactForm(data);
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
