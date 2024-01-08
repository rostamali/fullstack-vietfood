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
import { RegisterFormSchema } from '@/lib/helpers/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordField from '../shared/ui/password-field';
import { Button } from '@/components/ui/button';
import EmailVerify from './email-verify';
import Spinner from '../shared/ui/spinner';
import { toast } from 'sonner';
import { registerUser } from '@/lib/actions/auth.action';
import { ToastError } from '../shared/ui/custom-toast';

const Signup = () => {
	const [isPending, setIsPending] = useState(false);
	const [showVerification, setShowVerification] = useState(false);
	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});
	const handleSignupUser = async (
		data: z.infer<typeof RegisterFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await registerUser(data);
			setIsPending(false);
			if (result.success) {
				setShowVerification(true);
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError
					toastNumber={t}
					content={`Account registration failed`}
				/>
			));
			form.reset();
		}
	};
	return (
		<>
			{!showVerification ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignupUser)}
						className="form-flex-space"
					>
						<div className="grid grid-cols-2 gap-[25px]">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Firstname
										</FormLabel>
										<FormControl>
											<Input
												className="input-field-sm"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Lastname
										</FormLabel>
										<FormControl>
											<Input
												className="input-field-sm"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Email address
									</FormLabel>
									<FormControl>
										<Input
											className="input-field-sm"
											{...field}
										/>
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
											onChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<Button className="btn-primary-sm" disabled={isPending}>
							{isPending && (
								<Spinner
									className={'btn-spinner-sm mr-[5px]'}
								/>
							)}
							Create Account
						</Button>
					</form>
				</Form>
			) : (
				<EmailVerify />
			)}
		</>
	);
};

export default Signup;
