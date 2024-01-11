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
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
type formProps = {
	defaultValues: z.infer<typeof ProductFormSchema>;
};

const ProductForm: FC<formProps> = ({ defaultValues }) => {
	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues,
	});
	const handleCategory = async (data: z.infer<typeof ProductFormSchema>) => {
		console.log(data);
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
							title={'Products'}
							links={[]}
							params={null}
						/>
						<div className="flex items-center gap-[15px]">
							<Button className="btn-primary-sm">
								Save Changes
							</Button>
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
										<span className="font-poppins text-[12px] !text-primary-gray">
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
				</form>
			</Form>
		</div>
	);
};

export default ProductForm;
