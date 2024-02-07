'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ProductFormSchema } from '@/lib/helpers/form-validation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ProductTabFields from './product-tab-fields';
import ProductSidebarFields from './product-sidebar-fields';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import ContentEditor from '../../../../components/elements/shared/content-editor';
import { useCreateProduct, useUpdateProduct } from '@/lib/hooks/useProduct';
import Spinner from '@/components/elements/shared/spinner';
type productformProps = {
	defaultValues: z.infer<typeof ProductFormSchema>;
	pageTitle: string;
	id?: string;
};

const ProductForm: FC<productformProps> = ({
	defaultValues,
	pageTitle,
	id,
}) => {
	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues,
	});
	const { mutate: createProduct, isPending: isCreate } = useCreateProduct();
	const { mutate: updateproduct, isPending: isUpdate } = useUpdateProduct();
	const handleCategory = async (data: z.infer<typeof ProductFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createProduct(data);
		} else {
			if (id) {
				updateproduct({
					values: data,
					id,
				});
			}
		}
	};

	return (
		<div className="product-form">
			<Form {...form}>
				<form
					className="form-flex-space"
					onSubmit={form.handleSubmit(handleCategory)}
				>
					<div className="flex sm:items-center justify-between max-sm:flex-col gap-[40px]">
						<DashboardPageTitle
							title={pageTitle}
							links={[]}
							params={null}
						/>
						<div className="flex items-center gap-[15px]">
							{form.watch('type') === 'CREATE' ? (
								<Button
									className="btn-primary-sm"
									disabled={isCreate}
								>
									{isCreate && (
										<Spinner
											className={
												'btn-spinner-sm mr-[5px]'
											}
										/>
									)}
									Save Changes
								</Button>
							) : (
								<Button
									className="btn-primary-sm"
									disabled={isUpdate}
								>
									{isUpdate && (
										<Spinner
											className={
												'btn-spinner-sm mr-[5px]'
											}
										/>
									)}
									Save Changes
								</Button>
							)}
						</div>
					</div>
					<div className="grid lg:grid-cols-[1fr,300px] gap-[25px]">
						<div className="form-info form-flex-space">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Name
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
								name="excerpt"
								defaultValue={undefined}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Excerpt
										</FormLabel>
										<FormControl>
											<Textarea
												className="input-field-sm"
												{...field}
											/>
										</FormControl>
										<span className="form-note-sm">
											Write a short description.
										</span>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>
							<ProductTabFields form={form} />
						</div>
						<div className="form-sidebar">
							<ProductSidebarFields form={form} />
						</div>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="max-lg:mt-[30px]">
								<FormLabel className="field-label-sm">
									Description
								</FormLabel>
								<FormControl>
									<ContentEditor
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};

export default ProductForm;
