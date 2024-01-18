'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FC } from 'react';
import { AddressFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import SelectCountry from '@/components/ecom/countries/select-country';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import SelectState from '@/components/ecom/countries/select-state';
import { useCreateAddress, useUpdateAddress } from '@/lib/hooks/useAddress';
import Spinner from '../ui/spinner';
type AddressProps = {
	defaultValues: z.infer<typeof AddressFormSchema>;
	id?: string;
};

const AddressForm: FC<AddressProps> = ({ defaultValues, id }) => {
	const { mutate: createAddress, isPending: isCreate } = useCreateAddress();
	const { mutate: updateAddress, isPending: isUpdate } = useUpdateAddress();
	const form = useForm<z.infer<typeof AddressFormSchema>>({
		resolver: zodResolver(AddressFormSchema),
		defaultValues,
	});
	const handleAddress = async (data: z.infer<typeof AddressFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createAddress(data);
			form.reset();
		} else {
			updateAddress({
				id: id as string,
				values: data,
			});
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleAddress)}
			>
				<FormField
					control={form.control}
					name="countryCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-lg">
								Country/Region
							</FormLabel>
							<FormControl>
								<SelectCountry
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
									<FormControl>
										<SelectState
											trigger={'input-field-sm'}
											placeholder={'Select state'}
											value={field.value}
											countryCode={form.watch(
												'countryCode',
											)}
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
				<FormField
					control={form.control}
					name="setDefaultAddress"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start space-x-3 space-y-0">
							<FormControl>
								<div className="flex items-center gap-[10px]">
									<Checkbox
										id="default-address"
										className="checkbox-sm"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<FormLabel
										htmlFor="default-address"
										className="field-label-sm space-y-1 leading-none"
									>
										Set as default shipping address
									</FormLabel>
								</div>
							</FormControl>

							<FormMessage className="form-error block pt-[10px] !ml-0" />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					{form.watch('type') === 'CREATE' ? (
						<Button className="btn-primary-sm" disabled={isCreate}>
							{isCreate && (
								<Spinner
									className={'btn-spinner-sm mr-[5px]'}
								/>
							)}
							Create Address
						</Button>
					) : (
						<Button className="btn-primary-sm" disabled={isUpdate}>
							{isUpdate && (
								<Spinner
									className={'btn-spinner-sm mr-[5px]'}
								/>
							)}
							Save Changes
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default AddressForm;
