'use client';
import SelectField from '@/components/elements/select/select-field';
import { ToastError } from '@/components/elements/shared/custom-toast';
import Spinner from '@/components/elements/shared/spinner';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useDeleteProduct } from '@/lib/hooks/useProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
type ActionProps = {
	ids: string[] | null;
	onChange: (val: string[] | null) => void;
};

const ProductAction: React.FC<ActionProps> = ({ ids, onChange }) => {
	const { mutate: deleteProduct, isPending } = useDeleteProduct();
	const form = useForm<z.infer<typeof ProductActionSchema>>({
		resolver: zodResolver(ProductActionSchema),
		defaultValues: {
			actionTypes: '',
		},
	});
	const handleProductAction = (
		values: z.infer<typeof ProductActionSchema>,
	) => {
		if (ids) {
			deleteProduct({
				ids,
				type: values.actionTypes as ProductActionTypes,
			});
			onChange(null);
			form.reset();
		} else {
			toast.custom((t) => (
				<ToastError
					toastNumber={t}
					content={`Selected item is empty`}
				/>
			));
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleProductAction)}
				className="lg:col-span-2 w-full"
			>
				<FormField
					control={form.control}
					name="actionTypes"
					render={({ field }) => (
						<FormItem className="flex-1 w-full">
							<FormControl>
								<div className="flex items-center gap-[15px]">
									<SelectField
										triggerClass={'input-field-lg bg-white'}
										placeholder={'Select action'}
										defaultValue={field.value}
										onChange={field.onChange}
										options={ProductActions}
									/>
									<Button
										className="btn-primary-lg"
										disabled={isPending}
									>
										{isPending && (
											<Spinner className="h-[20px] w-[20px] stroke-white" />
										)}
										Apply
									</Button>
								</div>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
const ActionTypes = ['DELETE', 'DRAFT'];
const ProductActionSchema = z.object({
	actionTypes: z
		.string({
			required_error: 'Type is required',
		})
		.refine((value) => ActionTypes.includes(value), {
			message:
				'Type must be one of the options: ' + ActionTypes.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Type is required',
			},
		),
});
const ProductActions = [
	{
		label: 'Draft',
		value: 'DRAFT',
	},
	{
		label: 'Delete',
		value: 'DELETE',
	},
];

export default ProductAction;
