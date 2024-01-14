'use client';
import { Button } from '@/components/ui/button';
import Spinner from '../ui/spinner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpdateFormSchema } from '@/lib/helpers/form-validation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserRoleFormat } from '@/lib/helpers/formater';
import { useUpdateFiles } from '@/lib/hooks/useFile';
type FileUpdateForm = {
	defaultValues: z.infer<typeof FileUpdateFormSchema>;
	fileId: string;
	author: {
		name: string;
		role: UserRole;
	} | null;
};

const UpdateFile: FC<FileUpdateForm> = ({ defaultValues, author, fileId }) => {
	const { mutate: updateFile, isPending } = useUpdateFiles();
	const form = useForm<z.infer<typeof FileUpdateFormSchema>>({
		resolver: zodResolver(FileUpdateFormSchema),
		defaultValues,
	});
	const handleUpdateFile = async (
		data: z.infer<typeof FileUpdateFormSchema>,
	) => {
		updateFile({
			id: fileId,
			file: data,
		});
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space w-full"
				onSubmit={form.handleSubmit(handleUpdateFile)}
			>
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									File title
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
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										className="input-field-sm min-h-[45px]"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-between max-xm:justify-end">
					<div className="file-info max-xm:hidden">
						{author && (
							<div className="flex items-center gap-[5px]">
								<div className="h-[45px] w-[45px] bg-primary-gray rounded-full"></div>
								<div className="flex flex-col gap-[4px]">
									<p className="text-base-1">{author.name}</p>
									<span className="text-base-2 !text-[13px]">
										{UserRoleFormat[author.role]}
									</span>
								</div>
							</div>
						)}
					</div>
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

export default UpdateFile;
