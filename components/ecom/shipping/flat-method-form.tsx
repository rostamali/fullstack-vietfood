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
import { FlatMethodSchema } from '@/lib/helpers/form-validation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMethodByAdmin } from '@/lib/actions/ship.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import SelectField from '@/components/shared/ui/select-field';
import { TaxStatusList } from '@/constants';

const FlatMethodForm = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof FlatMethodSchema>>({
		resolver: zodResolver(FlatMethodSchema),
		defaultValues: {
			name: '',
			taxStatus: undefined,
			cost: 0,
			noClassCost: undefined,
			classList: ClassNameList
				? ClassNameList.map((item) => ({
						classId: item.id,
						cost: undefined,
						className: item.name,
				  }))
				: undefined,
		},
	});
	const { fields } = useFieldArray({
		control: form.control,
		name: 'classList',
	});
	const handleCreateMethod = async (
		data: z.infer<typeof FlatMethodSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createMethodByAdmin({
				type: 'FLAT_RATE',
				method: {
					name: data.name,
					taxStatus: data.taxStatus,
				},
				options: {
					cost: data.cost,
					noClassCost: data.noClassCost,
					classList: data.classList,
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
					content={`Flat method action failed`}
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
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Method title
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
						name="taxStatus"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Tax status
								</FormLabel>
								<FormControl>
									<SelectField
										triggerClass={'input-field-sm bg-white'}
										placeholder={''}
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
					<FormField
						control={form.control}
						name="noClassCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									No shipping class cost
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
				{fields.map((item, fieldIndex) => (
					<FormField
						key={fieldIndex}
						control={form.control}
						name={`classList.${fieldIndex}.cost`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									<strong>{item.className}</strong> shipping
									class cost
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
				))}
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

const ClassNameList = [
	{
		name: 'Samsung Germany',
		id: 'SSM415',
	},
	{
		name: 'HP USA',
		id: 'SSM2123215',
	},
];

export default FlatMethodForm;
