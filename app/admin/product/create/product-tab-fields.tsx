import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
import { ProductCollection, StockStatus, TaxStatusList } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import SetGallery from '@/components/media/files/set-gallery';
import ShipClassField from '@/components/elements/select/ship-class-field';
type TabProps = {
	form: UseFormReturn<z.infer<typeof ProductFormSchema>>;
};

const ProductTabFields: FC<TabProps> = ({ form }) => {
	return (
		<Tabs defaultValue="general" className="w-full font-poppins">
			<TabsList>
				<div className="flex items-center gap-2 bg-white p-1.5 rounded-md flex-wrap">
					{TabList.map((item, index) => (
						<TabsTrigger
							key={index}
							value={item.value}
							className="border-transparent data-[state=active]:bg-gray-muted data-[state=active]:shadow-none capitalize rounded-md"
						>
							{item.label}
						</TabsTrigger>
					))}
				</div>
			</TabsList>
			<div className="mt-[40px]">
				<TabsContent value="general">
					<div className="grid sm:grid-cols-2 gap-[25px]">
						<FormField
							control={form.control}
							name="retailPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Retail Price
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
							name="regularPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Regular Price
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
							name="salePrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Sale Price
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
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Product Label
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
						<div className="sm:col-span-2">
							<FormField
								control={form.control}
								name="collection"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Collection Type
										</FormLabel>
										<FormControl>
											<SelectField
												triggerClass={
													'input-field-sm bg-white'
												}
												placeholder={
													'Select collection...'
												}
												defaultValue={field.value}
												onChange={field.onChange}
												options={ProductCollection}
											/>
										</FormControl>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="inventory">
					<div className="grid sm:grid-cols-2 gap-[25px]">
						<FormField
							control={form.control}
							name="sku"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										SKU
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
							name="stockQTY"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Stock QTY
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
							name="stockStatus"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Stock Status
									</FormLabel>
									<FormControl>
										<SelectField
											triggerClass={
												'input-field-sm bg-white'
											}
											placeholder={'Select option...'}
											defaultValue={
												field.value ? 'true' : 'false'
											}
											onChange={(val) => {
												form.setValue(
													'stockStatus',
													val === 'true'
														? true
														: false,
												);
											}}
											options={StockStatus}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="threshold"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Low stock threshold
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
							name="soldIndividual"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start space-x-3 space-y-0">
									<FormControl>
										<div className="flex items-center gap-[10px]">
											<Checkbox
												id="sold_individual"
												className="checkbox-sm"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											<FormLabel
												htmlFor="sold_individual"
												className="field-label-sm space-y-1 leading-none"
											>
												Sold individually
											</FormLabel>
										</div>
									</FormControl>

									<FormMessage className="form-error block pt-[10px] !ml-0" />
								</FormItem>
							)}
						/>
					</div>
				</TabsContent>
				<TabsContent value="tax-shipping">
					<div className="grid sm:grid-cols-2 gap-[25px]">
						<FormField
							control={form.control}
							name="taxStatus"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Tax Status
									</FormLabel>
									<FormControl>
										<SelectField
											triggerClass={
												'input-field-sm bg-white'
											}
											placeholder={'Select status'}
											defaultValue={field.value}
											onChange={field.onChange}
											options={TaxStatusList}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Weight
									</FormLabel>
									<FormControl>
										<Input
											className="input-field-sm"
											{...field}
										/>
									</FormControl>
									<span className="font-poppins text-[12px] !text-primary-gray">
										Write Weight by <strong>KG</strong>
									</span>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="shipClass"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Shipping Class
									</FormLabel>
									<FormControl>
										<ShipClassField
											trigger={'input-field-sm bg-white'}
											placeholder={'Select class'}
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
					</div>
				</TabsContent>

				<TabsContent value="shipping">
					<div className="form-flex-space"></div>
				</TabsContent>
				<TabsContent value="gallery">
					<div className="form-flex-space">
						<FormField
							control={form.control}
							name="gallery"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Gallery
									</FormLabel>
									<FormControl>
										<SetGallery
											onChange={field.onChange}
											frameClass="grid lg:grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-[15px]"
											thumbClass="h-[100px] rounded-md"
											iconClass="text-black-dark text-opacity-50"
											selected={
												field.value ? field.value : null
											}
											defaultTrigger="h-[200px] rounded-md bg-white"
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
					</div>
				</TabsContent>
			</div>
		</Tabs>
	);
};

const TabList = [
	{
		label: 'General',
		value: 'general',
	},
	{
		label: 'Inventory',
		value: 'inventory',
	},
	{
		label: 'Tax & Shipping',
		value: 'tax-shipping',
	},
	{
		label: 'Gallery',
		value: 'gallery',
	},
];

export default ProductTabFields;
