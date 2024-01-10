'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { ShipZoneSchema } from '@/lib/helpers/form-validation';
import Spinner from '@/components/shared/ui/spinner';
import ShipZoneSelection from '../countries/ship-zone-selection';
import ShipMethodSelection from './ship-method-selection';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import { createZoneByAdmin } from '@/lib/actions/ship.action';

const ShipZoneForm = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ShipZoneSchema>>({
		resolver: zodResolver(ShipZoneSchema),
		defaultValues: {
			name: '',
			regions: null,
			methods: null,
		},
	});
	const handleZoneAction = async (data: z.infer<typeof ShipZoneSchema>) => {
		setIsPending(true);
		try {
			const result = await createZoneByAdmin(data as ShipZoneForm);
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				form.reset();
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Zone action failed`} />
			));
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleZoneAction)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Zone name
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
					name="regions"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Zone regions
							</FormLabel>
							<FormControl>
								<ShipZoneSelection
									selected={field.value}
									onChange={field.onChange}
									triggerClass={'input-field-sm'}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="methods"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Methods
							</FormLabel>
							<FormControl>
								<ShipMethodSelection
									selected={field.value ? field.value : []}
									onChange={field.onChange}
									className="input-field-sm"
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
					Save Changes
				</Button>
			</form>
		</Form>
	);
};

export default ShipZoneForm;
