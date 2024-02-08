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
import PasswordField from '../elements/shared/password-field';
import { Button } from '@/components/ui/button';
import EmailVerifyForm from './email-verify-form';
import Spinner from '../elements/shared/spinner';
import { useSignupUser } from '@/lib/hooks/useAuth';

const SignupForm = () => {
	const [showVerification, setShowVerification] = useState(false);
	const { mutate: signupUser, isPending } =
		useSignupUser(setShowVerification);
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
		signupUser(data);
	};
	return (
		<>
			{!showVerification ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignupUser)}
						className="form-flex-space"
					>
						<div className="grid sm:grid-cols-2 gap-[25px]">
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
				<EmailVerifyForm />
			)}
		</>
	);
};

export default SignupForm;
