'use client';
import { FC } from 'react';
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
import { useCreateCategory, useUpdateCategory } from '@/lib/hooks/useCategory';
type CategoryFormProps = {
	defaultValues: z.infer<typeof CategoryFormSchema>;
	id?: string;
};

const CategoryForm: FC<CategoryFormProps> = ({ defaultValues, id }) => {
	const form = useForm<z.infer<typeof CategoryFormSchema>>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues,
	});
	const { mutate: createCategory, isPending: isCreate } = useCreateCategory();
	const { mutate: updateCategory, isPending: isUpdate } = useUpdateCategory();
	const handleCategory = async (data: z.infer<typeof CategoryFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createCategory(data);
		} else {
			updateCategory({
				id: id as string,
				values: data,
			});
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
								onChange={field.onChange}
								selected={field.value ? field.value : null}
								frameClass={'w-[100px] h-[100px] rounded-md'}
								iconClass="text-primary-gray text-opacity-80"
								thumbClass="rounded-md"
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

				{form.watch('type') === 'CREATE' ? (
					<Button className="btn-primary-sm" disabled={isCreate}>
						{isCreate && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Create Category
					</Button>
				) : (
					<Button className="btn-primary-sm" disabled={isUpdate}>
						{isUpdate && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Save Changes
					</Button>
				)}
			</form>
		</Form>
	);
};

export default CategoryForm;
