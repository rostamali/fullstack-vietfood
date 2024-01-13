'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { TaxFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/shared/ui/spinner';
import SelectCountry from '@/components/ecom/countries/select-country';
import SelectState from '../countries/select-state';
import { useCreateTax, useUpdateTax } from '@/lib/hooks/useTax';
type TaxFormProps = {
	defaultValues: z.infer<typeof TaxFormSchema>;
	id?: string;
};

const TaxForm: FC<TaxFormProps> = ({ defaultValues, id }) => {
	const form = useForm<z.infer<typeof TaxFormSchema>>({
		resolver: zodResolver(TaxFormSchema),
		defaultValues,
	});
	const { mutate: createTax, isPending: isCreate } = useCreateTax();
	const { mutate: updateTax, isPending: isUpdate } = useUpdateTax();
	const handleTaxForm = async (data: z.infer<typeof TaxFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createTax(data);
			form.reset();
		} else {
			updateTax({
				id: id as string,
				values: data,
			});
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleTaxForm)}
			>
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Country
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
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									State
								</FormLabel>
								<FormControl>
									<SelectState
										trigger={'input-field-sm bg-white'}
										placeholder={'Select state'}
										value={field.value}
										onChange={field.onChange}
										countryCode={form.watch('country')}
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
							<FormItem className="col-span-2">
								<FormLabel className="field-label-sm">
									Postcode / Zipcode
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
						name="taxRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Rate %
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
						name="priority"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Priority
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
						name="name"
						render={({ field }) => (
							<FormItem className="col-span-2">
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
				</div>

				{form.watch('type') === 'CREATE' ? (
					<Button className="btn-primary-sm" disabled={isCreate}>
						{isCreate && (
							<Spinner className={'btn-spinner-sm mr-[5px]'} />
						)}
						New Rate
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

export default TaxForm;
