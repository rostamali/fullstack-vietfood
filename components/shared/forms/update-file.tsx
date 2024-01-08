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

import { useState, FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpdateFormSchema } from '@/lib/helpers/form-validation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserRoleFormat } from '@/lib/helpers/formater';
import { updateFilesByAdmin } from '@/lib/actions/file.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
type FileUpdateForm = {
	defaultValues: {
		title: string;
		description: string;
	};
	fileId: string;
	author: {
		name: string;
		role: UserRole;
	} | null;
};

const UpdateFile: FC<FileUpdateForm> = ({ defaultValues, author, fileId }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof FileUpdateFormSchema>>({
		resolver: zodResolver(FileUpdateFormSchema),
	});
	useEffect(() => {
		form.setValue('title', defaultValues.title);
		form.setValue('description', defaultValues.description);
	}, [fileId]);

	const handleUpdateFile = async (
		data: z.infer<typeof FileUpdateFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await updateFilesByAdmin({
				id: fileId,
				file: data,
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
				<ToastError toastNumber={t} content={`File update failed`} />
			));
		}
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
						defaultValue=""
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
						defaultValue=""
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
