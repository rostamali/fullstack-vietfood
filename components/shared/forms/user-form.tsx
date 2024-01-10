'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectField from '../ui/select-field';
import { UserRoles, UserStatus } from '@/constants';
import PasswordField from '../ui/password-field';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Spinner from '../ui/spinner';
import { useCreateUser, useUpdateUser } from '@/lib/react-query/hooks/useAuth';
type UserFormProps = {
	defaultValues: z.infer<typeof UserFormSchema>;
	id: string;
};

const UserForm: FC<UserFormProps> = ({ defaultValues, id }) => {
	const form = useForm<z.infer<typeof UserFormSchema>>({
		resolver: zodResolver(UserFormSchema),
		defaultValues,
	});
	const { mutate: createNewUser, isPending } = useCreateUser();
	const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id);
	const handleUserForm = async (data: z.infer<typeof UserFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createNewUser(data, {
				onSuccess: () => {
					form.reset();
				},
			});
		} else {
			updateUser(data);
		}
	};
	console.log(form.formState.errors);

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleUserForm)}
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
										onCheckedChange={field.onChange}
									/>
									<FormLabel
										htmlFor="send-message"
										className="field-label-sm !text-[14px] space-y-1 leading-none"
									>
										Send the new user an email about their
										account
									</FormLabel>
								</div>
							</FormControl>

							<FormMessage className="form-error block pt-[10px] !ml-0" />
						</FormItem>
					)}
				/>
				{form.watch('type') === 'CREATE' ? (
					<Button className="btn-primary-sm" disabled={isPending}>
						{isPending && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Create User
					</Button>
				) : (
					<Button className="btn-primary-sm" disabled={isUpdating}>
						{isUpdating && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Save Changes
					</Button>
				)}
			</form>
		</Form>
	);
};

export default UserForm;
