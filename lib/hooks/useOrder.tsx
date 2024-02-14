'use client';
import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	addToCard,
	createUserOrder,
	removeFromCart,
	updateDefaultAddress,
} from '../actions/order.action';
import { useRouter } from 'next/navigation';

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
export const useRemoveFromCart = () => {
	return useMutation({
		mutationFn: async (data: { cartItemId: string }) => {
			return await removeFromCart(data);
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
export const useCreateOrder = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: { cartId: string }) => {
			return await createUserOrder(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push(`/order/payment?orderId=${result.id}`);
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
export const useChangeShipAddress = () => {
	return useMutation({
		mutationFn: async (data: { addressId: string }) => {
			return await updateDefaultAddress({
				addressId: data.addressId,
			});
		},
	});
};
