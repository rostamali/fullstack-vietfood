'use client';
import { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { CategoryFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Spinner from '../ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import SelectCategory from '../ui/select-category';
import SetThumbnail from '../files/set-thumbnail';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
import {
	createCategoryByAdmin,
	updateCategoryByAdmin,
} from '@/lib/actions/category.action';
type CategoryFormProps = {
	value: CategoryForm;
	id: string | null;
	type: 'CREATE' | 'UPDATE';
};

const Category: FC<CategoryFormProps> = ({ value, type, id }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof CategoryFormSchema>>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: value,
	});
	const handleCategory = async (data: z.infer<typeof CategoryFormSchema>) => {
		setIsPending(true);
		if (type === 'CREATE') {
			try {
				const result = await createCategoryByAdmin(data);
				setIsPending(false);
				if (result.success) {
					toast.custom((t) => (
						<ToastSuccess
							toastNumber={t}
							content={result.message}
						/>
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
						content={`Category creation failed`}
					/>
				));
			}
		} else {
			try {
				if (id) {
					const result = await updateCategoryByAdmin({
						data,
						id,
					});
					setIsPending(false);
					if (result.success) {
						toast.custom((t) => (
							<ToastSuccess
								toastNumber={t}
								content={result.message}
							/>
						));
					} else {
						toast.custom((t) => (
							<ToastError
								toastNumber={t}
								content={result.message}
							/>
						));
					}
				} else {
					setIsPending(false);
					toast.custom((t) => (
						<ToastError
							toastNumber={t}
							content={`Category ID is required`}
						/>
					));
				}
			} catch (error) {
				setIsPending(false);
				toast.custom((t) => (
					<ToastError
						toastNumber={t}
						content={`Category update failed`}
					/>
				));
			}
		}
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleCategory)}
			>
				<FormField
					control={form.control}
					name="thumbnail"
					render={({ field }) => (
						<FormItem>
							<SetThumbnail
								trigger={
									<div className="thumbnail-pen__trigger">
										<Pencil size={15} strokeWidth={2} />
									</div>
								}
								modalTitle={'Select thumbnail'}
								gallery={false}
								onChange={field.onChange}
								heightWidth={'h-[100px] w-[100px]'}
								borderRadius={'rounded-md'}
								selected={field.value ? field.value : null}
							/>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Name
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="parent"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Parent
							</FormLabel>
							<FormControl>
								<SelectCategory
									trigger={'input-field-sm'}
									placeholder={'Select Parent'}
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					defaultValue={undefined}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									className="input-field-sm"
									{...field}
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
					{type === 'CREATE' ? 'Create Category' : 'Update Category'}
				</Button>
			</form>
		</Form>
	);
};

export default Category;
