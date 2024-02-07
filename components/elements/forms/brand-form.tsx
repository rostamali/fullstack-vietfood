'use client';
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
import { Input } from '@/components/ui/input';
import { BrandFormSchema } from '@/lib/helpers/form-validation';
import SetThumbnail from '../../media/files/set-thumbnail';
import { Pencil } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Spinner from '../shared/spinner';
import { useCreateBrand, useUpdateBrand } from '@/lib/hooks/useBrand';
type BrandFormProps = {
	value: z.infer<typeof BrandFormSchema>;
	id?: string;
};
const BrandFrom: FC<BrandFormProps> = ({ value, id }) => {
	const { mutate: createBrand, isPending: isCreate } = useCreateBrand();
	const { mutate: updateBrand, isPending: isUpdate } = useUpdateBrand();
	const form = useForm<z.infer<typeof BrandFormSchema>>({
		resolver: zodResolver(BrandFormSchema),
		defaultValues: value,
	});
	const handleBrand = async (data: z.infer<typeof BrandFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createBrand(data);
		} else {
			updateBrand({
				id: id as string,
				values: data,
			});
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleBrand)}
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
								frameClass={'w-[100px] h-[100px] rounded-md'}
								iconClass="text-primary-gray text-opacity-80"
								thumbClass="rounded-md"
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
								Company name
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="contactName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Contact name
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
						name="contactEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Contact email
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
						name="contactPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Company phone
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
						name="contactWebsite"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Company website
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
					name="description"
					defaultValue={undefined}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Brand description
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
						Create Brand
					</Button>
				) : (
					<Button className="btn-primary-sm" disabled={isUpdate}>
						{isUpdate && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						Update Brand
					</Button>
				)}
			</form>
		</Form>
	);
};

export default BrandFrom;
