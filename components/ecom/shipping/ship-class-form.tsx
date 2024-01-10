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
import { useState, FC } from 'react';
import Spinner from '@/components/shared/ui/spinner';
import {
	createShipClassByAdmin,
	updateShipClassByAdmin,
} from '@/lib/actions/ship.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
type ShipcClassForm = {
	type: 'CREATE' | 'UPDATE';
	values: {
		name: string;
		description: string;
	};
	id: string | null;
};

const ShipClassForm: FC<ShipcClassForm> = ({ type, values, id }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ShipClassSchema>>({
		resolver: zodResolver(ShipClassSchema),
		defaultValues: values,
	});
	const handleShipClass = async (data: z.infer<typeof ShipClassSchema>) => {
		setIsPending(true);
		try {
			if (type === 'CREATE') {
				const result = await createShipClassByAdmin(data);
				setIsPending(false);
				if (result.success) {
					toast.custom((t) => (
						<ToastSuccess
							toastNumber={t}
							content={result.message}
						/>
					));
					form.reset();
				} else {
					toast.custom((t) => (
						<ToastError toastNumber={t} content={result.message} />
					));
				}
			} else {
				if (id) {
					const result = await updateShipClassByAdmin({
						data,
						id,
					});
					setIsPending(false);
					if (result.success) {
						toast.custom((t) => (
							<ToastSuccess
								toastNumber={t}
								content={result.message}
							/>
						));
					} else {
						toast.custom((t) => (
							<ToastError
								toastNumber={t}
								content={result.message}
							/>
						));
					}
				} else {
					setIsPending(false);
					toast.custom((t) => (
						<ToastError
							toastNumber={t}
							content={`Class id is required`}
						/>
					));
				}
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Class action failed`} />
			));
			form.reset();
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
				<Button className="btn-primary-sm" disabled={isPending}>
					{isPending && (
						<Spinner className={'btn-spinner-sm mr-[5px]'} />
					)}
					{type === 'CREATE' ? 'Create Class' : 'Update Class'}
				</Button>
			</form>
		</Form>
	);
};

export default ShipClassForm;
