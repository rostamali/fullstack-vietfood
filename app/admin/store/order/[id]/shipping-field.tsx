import CountryField from '@/components/elements/select/country-field';
import StateField from '@/components/elements/select/state-field';
import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OrderDetailsFormSchema } from '@/lib/helpers/form-validation';
import { Truck } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

type FieldSidebarProps = {
	form: UseFormReturn<z.infer<typeof OrderDetailsFormSchema>>;
	isLoading: boolean;
};

const ShippingField: React.FC<FieldSidebarProps> = ({ form, isLoading }) => {
	return (
		<div className="form-flex-space bg-white p-4 rounded-md">
			<div className="flex items-center gap-3">
				<div className="h-[45px] w-[45px] bg-gray-light rounded-md flex-center text-primary-gray">
					<Truck size={18} />
				</div>
				<h5 className="heading-5 !font-medium">Shipping info</h5>
			</div>
			<FormField
				control={form.control}
				name="countryCode"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-lg">
							Country/Region
						</FormLabel>
						<FormControl>
							<CountryField
								trigger={'input-field-sm bg-white'}
								placeholder={'Select country'}
								value={field.value}
								onChange={field.onChange}
							/>
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
							<FormLabel className="field-label-lg">
								Personal information
							</FormLabel>
							<FormControl>
								<Input
									placeholder="contact name*"
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
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm opacity-0">
								Contact name
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Contact number*"
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
					name="addressLine1"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-lg">
								Address
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Street, house/apartment/unit"
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
					name="addressLine2"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm opacity-0">
								Address
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Apt,Suite,Unit,etc.（Optional）"
									className="input-field-sm"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="col-span-2 grid grid-cols-3 gap-[15px]">
					<FormField
						control={form.control}
						name="stateCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-lg">
									State
								</FormLabel>
								<FormControl>
									<StateField
										trigger={'input-field-sm'}
										placeholder={'Select state'}
										value={field.value}
										countryCode={form.watch('countryCode')}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="cityName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-lg">
									City
								</FormLabel>
								<FormControl>
									<Input
										placeholder="City"
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
						name="zipCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-lg">
									Zip Code
								</FormLabel>
								<FormControl>
									<Input
										placeholder="ZIP code"
										className="input-field-sm"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button className="btn-primary-lg" form="order-form-info">
					{isLoading ? 'Form Loading' : `Save Changes`}
				</Button>
			</div>
		</div>
	);
};

export default ShippingField;
