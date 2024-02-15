import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import {
	createAccountByAdmin,
	deleteUserByAdmin,
	fetchUserProfileById,
	forgotPasswordByUser,
	loginUser,
	resetPasswordByUser,
	signupUser,
	updateAccountPassword,
	updateUserProfile,
	updateUserProfileByAdmin,
} from '@/lib/actions/auth.action';
import {
	ChangePasswordFormSchema,
	ForgotPasswordSchema,
	LoginFormSchema,
	ProfileFormSchema,
	RegisterFormSchema,
	ResetPasswordSchema,
	UserFormSchema,
} from '@/lib/helpers/form-validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';

/* ================================ */
// User actions to their accounts
/* ================================ */
export const useLoginUser = (onChange: (value: boolean) => void) => {
	const searchParams = useSearchParams();
	const redirectURL = searchParams.get('redirect');
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: z.infer<typeof LoginFormSchema>) => {
			return await loginUser(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				onChange(false);
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push(redirectURL ? redirectURL : '/');
			} else {
				onChange(true);
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			onChange(true);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
export const useSignupUser = (onChange: (value: boolean) => void) => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof RegisterFormSchema>) => {
			return await signupUser(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				onChange(true);
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
				onChange(false);
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
			onChange(false);
		},
	});
};
export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ProfileFormSchema>) => {
			return await updateUserProfile(data);
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
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ForgotPasswordSchema>) => {
			return await forgotPasswordByUser(data);
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
export const useResetPassword = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: {
			token: string;
			values: z.infer<typeof ResetPasswordSchema>;
		}) => {
			return await resetPasswordByUser({
				token: data.token,
				data: data.values,
			});
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
/* ================================ */
// Admin actions for user accounts
/* ================================ */
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
