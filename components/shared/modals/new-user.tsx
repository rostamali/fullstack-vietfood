'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordField from '../ui/password-field';
import { Button } from '@/components/ui/button';
import SelectField from '../ui/select-field';
import { UserRoles } from '@/constants';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
import { createAccountByAdmin } from '@/lib/actions/auth.action';
import Spinner from '../ui/spinner';
import { Checkbox } from '@/components/ui/checkbox';

const NewUser = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof CreateUserFormSchema>>({
		resolver: zodResolver(CreateUserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			role: '',
			sendMessage: false,
		},
	});
	const handleNewUser = async (
		data: z.infer<typeof CreateUserFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createAccountByAdmin(data);
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				form.reset();
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
					content={`Account creation failed`}
				/>
			));
			form.reset();
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Add User</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New User
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<div className="mt">
					<Form {...form}>
						<form
							className="form-flex-space"
							onSubmit={form.handleSubmit(handleNewUser)}
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
												type="email"
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
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Role
										</FormLabel>
										<FormControl>
											<SelectField
												triggerClass={'input-field-sm'}
												placeholder={'Select role'}
												defaultValue={field.value}
												onChange={(val) => {
													field.onChange(val);
												}}
												options={UserRoles}
											/>
										</FormControl>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								defaultValue=""
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
								name="sendMessage"
								render={({ field }) => (
									<FormItem className="flex flex-col items-start space-x-3 space-y-0">
										<FormControl>
											<div className="flex items-center gap-[10px]">
												<Checkbox
													id="send-message"
													className="checkbox-sm"
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
												<FormLabel
													htmlFor="send-message"
													className="field-label-sm !text-[14px] space-y-1 leading-none"
												>
													Send the new user an email
													about their account
												</FormLabel>
											</div>
										</FormControl>

										<FormMessage className="form-error block pt-[10px] !ml-0" />
									</FormItem>
								)}
							/>
							<Button
								className="btn-primary-sm"
								disabled={isPending}
							>
								{isPending && (
									<Spinner
										className={'btn-spinner-sm mr-[5px]'}
									/>
								)}
								Create User
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NewUser;
