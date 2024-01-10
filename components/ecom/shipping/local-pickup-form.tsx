'use client';
import Spinner from '@/components/shared/ui/spinner';
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
import { LocalPickupMethodSchema } from '@/lib/helpers/form-validation';
import { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectField from '@/components/shared/ui/select-field';
import { TaxStatusList } from '@/constants';
import { createMethodByAdmin } from '@/lib/actions/ship.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
type LocalMethodProps = {
	defaultValues: {
		name: string;
		taxStatus: undefined | taxStatusType;
		cost: number;
	};
	type: 'CREATE' | 'UPDATE';
	id?: string;
};

const LocalPickupForm: FC<LocalMethodProps> = ({ defaultValues, type, id }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof LocalPickupMethodSchema>>({
		resolver: zodResolver(LocalPickupMethodSchema),
		defaultValues,
	});
	const handleCreateMethod = async (
		data: z.infer<typeof LocalPickupMethodSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createMethodByAdmin({
				type: 'LOCAL_PICKUP',
				method: {
					name: data.name,
					taxStatus: data.taxStatus,
				},
				options: {
					cost: data.cost,
				},
			});
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
				<ToastError
					toastNumber={t}
					content={`Method creation failed`}
				/>
			));
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space w-full"
				onSubmit={form.handleSubmit(handleCreateMethod)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Method title
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
					name="taxStatus"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Tax status
							</FormLabel>
							<FormControl>
								<SelectField
									triggerClass={'input-field-sm bg-white'}
									placeholder={'Select options...'}
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
					name="cost"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Cost
							</FormLabel>
							<FormControl>
								<Input
									type="number"
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
					Save Changes
				</Button>
			</form>
		</Form>
	);
};

export default LocalPickupForm;
