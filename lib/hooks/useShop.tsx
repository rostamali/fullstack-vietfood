'use client';
import { useMutation } from '@tanstack/react-query';
import {
	addProductToWishlist,
	removeProductFormWishlist,
} from '../actions/shop.action';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';

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
