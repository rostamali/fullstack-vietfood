'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginFormSchema } from '@/lib/helpers/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordField from '../shared/ui/password-field';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { loginUser } from '@/lib/actions/auth.action';
import Spinner from '../shared/ui/spinner';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../shared/ui/custom-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const Login = () => {
	const searchParams = useSearchParams();
	const redirectURL = searchParams.get('redirect');
	const router = useRouter();

	const [isPending, setIsPending] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});
	const handleLoginUser = async (data: z.infer<typeof LoginFormSchema>) => {
		setIsPending(true);
		try {
			const result = await loginUser(data);
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				if (!redirectURL) {
					router.push('/');
				} else {
					router.push(redirectURL as string);
				}
			} else {
				setShowForgotPassword(true);
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			setShowForgotPassword(true);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Account login failed`} />
			));
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLoginUser)}
				className="form-flex-space"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Email address
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="password"
								className="field-label-sm"
							>
								Enter password
							</FormLabel>
							<FormControl>
								<PasswordField
									fieldClass={'input-field-sm'}
									id={'password'}
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-[15px]">
					<FormField
						control={form.control}
						name="remember"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start space-x-3 space-y-0">
								<FormControl>
									<div className="flex items-center gap-[10px]">
										<Checkbox
											id="remember-me"
											className="checkbox-sm"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<FormLabel
											htmlFor="remember-me"
											className="field-label-sm space-y-1 leading-none"
										>
											Remember me
										</FormLabel>
									</div>
								</FormControl>

								<FormMessage className="form-error block pt-[10px] !ml-0" />
							</FormItem>
						)}
					/>
					{showForgotPassword && (
						<div className="text-base-1 text-right">
							<Link
								href="/"
								className="underline hover:text-action-danger"
							>
								Forget Password?
							</Link>
						</div>
					)}
				</div>
				<Button className="btn-primary-sm" disabled={isPending}>
					{isPending && (
						<Spinner className={'btn-spinner-sm mr-[5px]'} />
					)}
					Login
				</Button>
			</form>
		</Form>
	);
};

export default Login;
