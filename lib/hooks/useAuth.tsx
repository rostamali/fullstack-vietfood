import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import {
	createAccountByAdmin,
	deleteUserByAdmin,
	fetchUserProfileById,
	updateUserProfileByAdmin,
} from '@/lib/actions/auth.action';
import { UserFormSchema } from '@/lib/helpers/form-validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as z from 'zod';

export const useCreateUser = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
			return await createAccountByAdmin({
				...data,
				password: data.password as string,
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
export const useUpdateUser = (id: string) => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
			return await updateUserProfileByAdmin({
				id,
				data: {
					...data,
					role: data.role as UserRole,
					status: data.status as UserStatus,
				},
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
export const useUserDetails = (id: string) => {
	return useQuery({
		queryKey: ['userDetails', id],
		queryFn: async () => await fetchUserProfileById({ id }),
	});
};
export const useDeleteAccount = () => {
	return useMutation({
		mutationFn: async (data: {
			ids: string[];
			actionType: 'DEACTIVE' | 'DELETE';
		}) => {
			return await deleteUserByAdmin({
				ids: data.ids,
				actionType: data.actionType,
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
//
