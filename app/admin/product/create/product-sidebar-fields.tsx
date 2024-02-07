import { FC } from 'react';
import { ProductFormSchema } from '@/lib/helpers/form-validation';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import SelectField from '@/components/elements/select/select-field';
import { ProductStatus } from '@/constants';
import SetThumbnail from '@/components/media/files/set-thumbnail';
import SelectBrand from '@/components/elements/select/brand-field';
import CategoryField from '@/components/elements/select/category-field';
type FieldSidebarProps = {
	form: UseFormReturn<z.infer<typeof ProductFormSchema>>;
};

const ProductSidebarFields: FC<FieldSidebarProps> = ({ form }) => {
	return (
		<div className="form-flex-space">
			<FormField
				control={form.control}
				name="status"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-sm">Status</FormLabel>
						<FormControl>
							<SelectField
								triggerClass={'input-field-sm bg-white'}
								placeholder={'Select status...'}
								defaultValue={field.value}
								onChange={field.onChange}
								options={ProductStatus}
							/>
						</FormControl>
						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="category"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-sm">
							Category
						</FormLabel>
						<FormControl>
							<CategoryField
								trigger={'input-field-sm bg-white'}
								placeholder={'Select category...'}
								value={field.value}
								onChange={field.onChange}
								isParent={false}
							/>
						</FormControl>
						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="brand"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-sm">Brand</FormLabel>
						<FormControl>
							<SelectBrand
								trigger={'input-field-sm bg-white'}
								placeholder={'Select brand...'}
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
				name="thumbnail"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-sm">
							Thumbnail
						</FormLabel>
						<FormControl>
							<SetThumbnail
								trigger={
									<div className="text-base-2">
										Choose Thumbnail
									</div>
								}
								modalTitle={'Select Thumbnail'}
								onChange={field.onChange}
								frameClass="w-full h-[240px] bg-white rounded-md"
								thumbClass="overflow-hidden rounded-md"
								iconClass="text-black-dark text-opacity-50"
								selected={field.value ? field.value : null}
							/>
						</FormControl>
						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default ProductSidebarFields;
