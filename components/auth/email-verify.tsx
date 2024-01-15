'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import OtpField from '../shared/ui/otp-field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { verifyUserEmail } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import Spinner from '../shared/ui/spinner';
import { ToastError, ToastSuccess } from '../shared/ui/custom-toast';

const EmailVerify = () => {
	const EmailVerifyForm = z.object({
		otp: z.string({ required_error: 'Password is required' }),
	});
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof EmailVerifyForm>>({
		resolver: zodResolver(EmailVerifyForm),
		defaultValues: {
			otp: '',
		},
	});
	const handleConfirmOtp = async (data: z.infer<typeof EmailVerifyForm>) => {
		setIsPending(true);
		try {
			const result = await verifyUserEmail({ code: data.otp });
			setIsPending(false);
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
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError
					toastNumber={t}
					content={`Email verification failed`}
				/>
			));
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleConfirmOtp)}
				className="form-flex-space"
			>
				<FormField
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								To confirm the email enter 6 digit OTP here
							</FormLabel>
							<FormControl>
								<OtpField
									onChange={field.onChange}
									fields={6}
									value={field.value}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<Button className="btn-primary-sm" disabled={isPending}>
					{isPending && (
						<Spinner className={'btn-spinner-sm mr-[5px]'} />
					)}
					Create Account
				</Button>
			</form>
		</Form>
	);
};

export default EmailVerify;
