import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import {
	createAccountByAdmin,
	deleteUserByAdmin,
	fetchUserProfileById,
	updateAccountPassword,
	updateUserProfileByAdmin,
} from '@/lib/actions/auth.action';
import {
	ChangePasswordFormSchema,
	UserFormSchema,
} from '@/lib/helpers/form-validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
export const useUpdatePassword = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: z.infer<typeof ChangePasswordFormSchema>) => {
			return await updateAccountPassword(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push('/auth/login');
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
export const useUpdateUser = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof UserFormSchema>;
		}) => {
			return await updateUserProfileByAdmin({
				id: data.id,
				data: {
					...data.values,
					role: data.values.role as UserRole,
					status: data.values.status as UserStatus,
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
