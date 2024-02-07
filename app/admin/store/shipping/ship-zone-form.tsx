'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShipFormSchema } from '@/lib/helpers/form-validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ShipMethods from './ship-methods';
import { Button } from '@/components/ui/button';
import { useCreateShipZone, useUpdateShipZone } from '@/lib/hooks/useShip';
import Spinner from '@/components/elements/shared/spinner';
import CountryStateField from '@/components/elements/select/country-state-field';
type ShipFormProps = {
	defaultValues: z.infer<typeof ShipFormSchema>;
	id?: string;
};

const ShipZoneForm: FC<ShipFormProps> = ({ defaultValues, id }) => {
	const form = useForm<z.infer<typeof ShipFormSchema>>({
		resolver: zodResolver(ShipFormSchema),
		defaultValues,
	});
	const { mutate: createShipZone, isPending: isCreate } = useCreateShipZone();
	const { mutate: updateProduct, isPending: isUpdate } = useUpdateShipZone();
	const handleZoneAction = async (data: z.infer<typeof ShipFormSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createShipZone(data);
		} else {
			updateProduct({
				id: id as string,
				values: data,
			});
		}
	};
	return (
		<div className="ship-form">
			<Form {...form}>
				<form
					className="form-flex-space"
					onSubmit={form.handleSubmit(handleZoneAction)}
				>
					<div className="grid sm:grid-cols-2 grid-cols-1 gap-[25px]">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Zone name
									</FormLabel>
									<FormControl>
										<Input
											className="input-field-sm"
											{...field}
										/>
									</FormControl>
									<span className="form-note-sm">
										Give your zone a name! E.g. Local, or
										Worldwide.
									</span>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="regions"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Zone regions
									</FormLabel>
									<FormControl>
										<CountryStateField
											selected={field.value}
											onChange={field.onChange}
											triggerClass={
												'input-field-sm bg-white'
											}
										/>
									</FormControl>
									<span className="form-note-sm">
										List the regions you'd like to include
										in your shipping zone. Customers will be
										matched against these regions.
									</span>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<div className="sm:col-span-2">
							<ShipMethods form={form} />
						</div>
					</div>
					<div className="flex justify-end">
						{form.watch('type') === 'CREATE' ? (
							<Button
								className="btn-primary-sm"
								disabled={isCreate}
							>
								{isCreate && (
									<Spinner
										className={'btn-spinner-sm mr-[5px]'}
									/>
								)}
								Create New Zone
							</Button>
						) : (
							<Button
								className="btn-primary-sm"
								disabled={isUpdate}
							>
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
		</div>
	);
};

export default ShipZoneForm;
