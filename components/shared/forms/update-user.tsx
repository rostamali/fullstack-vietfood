'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import SelectField from '../ui/select-field';
import { UserRoles, UserStatus } from '@/constants';
import PasswordField from '../ui/password-field';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
	fetchUserProfileById,
	updateUserProfileByAdmin,
} from '@/lib/actions/auth.action';
import { useEffect, useState } from 'react';
import Spinner from '../ui/spinner';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';

const UpdateUser = ({ id }: { id: string }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
		resolver: zodResolver(UpdateUserFormSchema),
	});
	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserProfileById({ id });
			if (result) {
				form.setValue('firstName', result.firstName);
				form.setValue(
					'lastName',
					result.lastName ? result.lastName : '',
				);
				form.setValue('email', result.email);
				form.setValue('role', result.role);
				form.setValue('status', result.status);
				form.setValue('sendMessage', false);
			}
		};
		fetchData();
	}, [id]);
	const handleUpdateUser = async (
		data: z.infer<typeof UpdateUserFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await updateUserProfileByAdmin({
				id,
				data: {
					...data,
					role: data.role as UserRole,
					status: data.status as UserStatus,
				},
			});
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Account update failed`} />
			));
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space w-full"
				onSubmit={form.handleSubmit(handleUpdateUser)}
			>
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="firstName"
						defaultValue=""
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
						defaultValue=""
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
					<FormField
						control={form.control}
						name="email"
						defaultValue=""
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
						name="role"
						defaultValue=""
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
						name="status"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel
									htmlFor="password"
									className="field-label-sm"
								>
									Status
								</FormLabel>
								<FormControl>
									<SelectField
										triggerClass={'input-field-sm'}
										placeholder={'Select status'}
										defaultValue={field.value}
										onChange={(val) => {
											field.onChange(val);
										}}
										options={UserStatus}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						defaultValue={null}
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
				</div>
				<FormField
					control={form.control}
					name="sendMessage"
					defaultValue={false}
					render={({ field }) => (
						<FormItem className="flex flex-col items-start space-x-3 space-y-0">
							<FormControl>
								<div className="flex items-center gap-[10px]">
									<Checkbox
										id="send-message"
										className="checkbox-sm"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<FormLabel
										htmlFor="send-message"
										className="field-label-sm !text-[14px] space-y-1 leading-none"
									>
										Send the update information to the user
									</FormLabel>
								</div>
							</FormControl>

							<FormMessage className="form-error block pt-[10px] !ml-0" />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button className="btn-primary-sm" disabled={isPending}>
						{isPending && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Save Update
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UpdateUser;
