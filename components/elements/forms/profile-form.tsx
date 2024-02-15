'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProfileFormSchema } from '@/lib/helpers/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Spinner from '../shared/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateProfile } from '@/lib/hooks/useAuth';
type FormProps = {
	defaultValues: z.infer<typeof ProfileFormSchema>;
};

const ProfileForm: React.FC<FormProps> = ({ defaultValues }) => {
	const { mutate: updateProfile, isPending } = useUpdateProfile();
	const form = useForm<z.infer<typeof ProfileFormSchema>>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues,
	});

	const handleProfile = async (data: z.infer<typeof ProfileFormSchema>) => {
		updateProfile(data);
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleProfile)}
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
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Your bio
							</FormLabel>
							<FormControl>
								<Textarea
									className="input-field-sm min-h-[150px]"
									{...field}
								/>
							</FormControl>
							<span className="font-poppins text-[12px] !text-primary-gray">
								Write a short introduction.
							</span>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button className="btn-primary-sm" disabled={isPending}>
						{isPending && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProfileForm;
