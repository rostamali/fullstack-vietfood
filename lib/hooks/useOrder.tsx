'use client';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addToCard } from '../actions/order.action';

export const useAddToCart = () => {
	return useMutation({
		mutationFn: async (data: AddToCart) => {
			return await addToCard(data);
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
