'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { BrandFormSchema } from '@/lib/helpers/form-validation';
import SetThumbnail from '../files/set-thumbnail';
import { Pencil } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Spinner from '../ui/spinner';
import {
	createBrandByAdmin,
	updateBrandByAdmin,
} from '@/lib/actions/brand.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
type BrandFormProps = {
	value: BrandForm;
	id: string | null;
	type: 'CREATE' | 'UPDATE';
};
const Brand: FC<BrandFormProps> = ({ value, type, id }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof BrandFormSchema>>({
		resolver: zodResolver(BrandFormSchema),
		defaultValues: value,
	});
	const handleBrand = async (data: z.infer<typeof BrandFormSchema>) => {
		setIsPending(true);
		if (type === 'CREATE') {
			try {
				const result = await createBrandByAdmin(data as BrandForm);
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
			} catch (error) {
				setIsPending(false);
				toast.custom((t) => (
					<ToastError
						toastNumber={t}
						content={`Category creation failed`}
					/>
				));
			}
		} else {
			try {
				if (id) {
					const result = await updateBrandByAdmin({
						data: data as BrandForm,
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
							content={`Category ID is required`}
						/>
					));
				}
			} catch (error) {
				setIsPending(false);
				toast.custom((t) => (
					<ToastError
						toastNumber={t}
						content={`Category update failed`}
					/>
				));
			}
		}
	};
	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleBrand)}
			>
				<FormField
					control={form.control}
					name="thumbnail"
					render={({ field }) => (
						<FormItem>
							<SetThumbnail
								trigger={
									<div className="thumbnail-pen__trigger">
										<Pencil size={15} strokeWidth={2} />
									</div>
								}
								modalTitle={'Select thumbnail'}
								gallery={false}
								onChange={field.onChange}
								frameClass={'w-[100px] h-[100px] rounded-md'}
								iconClass="text-primary-gray text-opacity-80"
								thumbClass="rounded-md"
								selected={field.value ? field.value : null}
							/>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Company name
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
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
								<FormLabel className="field-label-sm">
									Contact name
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
						name="contactEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Contact email
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
						name="contactPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Company phone
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
						name="contactWebsite"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Company website
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

				<FormField
					control={form.control}
					name="description"
					defaultValue={undefined}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Brand description
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
					{type === 'CREATE' ? 'Create Brand' : 'Update Brand'}
				</Button>
			</form>
		</Form>
	);
};

export default Brand;
