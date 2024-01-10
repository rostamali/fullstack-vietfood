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
import { FreeShipMethodSchema } from '@/lib/helpers/form-validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectField from '@/components/shared/ui/select-field';
import { FreeShipRequired } from '@/constants';
import { createMethodByAdmin } from '@/lib/actions/ship.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';

const FreeMethodForm = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof FreeShipMethodSchema>>({
		resolver: zodResolver(FreeShipMethodSchema),
		defaultValues: {
			name: '',
			required: undefined,
			miniOrderAmount: 0,
		},
	});
	const handleCreateMethod = async (
		data: z.infer<typeof FreeShipMethodSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createMethodByAdmin({
				type: 'FREE_SHIPPING',
				method: {
					name: data.name,
					taxStatus: 'NONE',
				},
				options: {
					required: data.required,
					miniOrderAmount: data.miniOrderAmount,
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
					name="required"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Free shipping requires...
							</FormLabel>
							<FormControl>
								<SelectField
									triggerClass={'input-field-sm bg-white'}
									placeholder={'Choose options...'}
									defaultValue={field.value}
									onChange={(val) => {
										form.setValue('required', val);
										form.setValue(
											'miniOrderAmount',
											undefined,
										);
									}}
									options={FreeShipRequired}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				{form.watch('required') === 'MINI_ORDER_AMOUNT' && (
					<FormField
						control={form.control}
						name="miniOrderAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Minimum Order Amount
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
				)}
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

export default FreeMethodForm;
