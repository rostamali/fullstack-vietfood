'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShipClassSchema } from '@/lib/helpers/form-validation';
import { Button } from '@/components/ui/button';
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
import { FC } from 'react';
import Spinner from '@/components/elements/shared/spinner';
import { useCreateShipClass, useUpdateShipClass } from '@/lib/hooks/useShip';
type ShipcClassForm = {
	defaultValues: z.infer<typeof ShipClassSchema>;
	id?: string;
};

const ShipClassForm: FC<ShipcClassForm> = ({ defaultValues, id }) => {
	const { mutate: updateClass, isPending: isUpdate } = useUpdateShipClass();
	const { mutate: createClass, isPending: isCreate } = useCreateShipClass();
	const form = useForm<z.infer<typeof ShipClassSchema>>({
		resolver: zodResolver(ShipClassSchema),
		defaultValues,
	});
	const handleShipClass = async (data: z.infer<typeof ShipClassSchema>) => {
		if (form.watch('type') === 'CREATE') {
			createClass(data);
			form.reset();
		} else {
			updateClass({
				id: id as string,
				values: data,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space w-full"
				onSubmit={form.handleSubmit(handleShipClass)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Class name
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
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Class description
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
						Create New Class
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

export default ShipClassForm;
