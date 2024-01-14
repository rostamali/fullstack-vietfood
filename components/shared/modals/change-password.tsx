'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import PasswordField from '../ui/password-field';
import { useUpdatePassword } from '@/lib/hooks/useAuth';
import Spinner from '../ui/spinner';

const ChangePassword = () => {
	const { mutate: updatePassword, isPending } = useUpdatePassword();
	const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
		resolver: zodResolver(ChangePasswordFormSchema),
	});
	const handleBrand = async (
		data: z.infer<typeof ChangePasswordFormSchema>,
	) => {
		updatePassword(data);
		form.reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Change Password</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Change Password
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Fill the form using correct information.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="form-flex-space"
						onSubmit={form.handleSubmit(handleBrand)}
					>
						<FormField
							control={form.control}
							name="oldPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="old-password"
										className="field-label-sm"
									>
										Enter old password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'old-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="new-password"
										className="field-label-sm"
									>
										Enter new password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'new-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="confirm-password"
										className="field-label-sm"
									>
										Enter confirm password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'confirm-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
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
							Save Changes
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ChangePassword;
