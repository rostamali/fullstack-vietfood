'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { CompressFormSchema } from '@/lib/helpers/form-validation';
import { Input } from '@/components/ui/input';
import { useCompressFile } from '@/lib/hooks/useFile';
import Spinner from '@/components/elements/shared/spinner';
type FormProps = {
	fileId: string;
};

const CompressFile: React.FC<FormProps> = ({ fileId }) => {
	const { mutate: compressFile, isPending } = useCompressFile(fileId);
	const form = useForm<z.infer<typeof CompressFormSchema>>({
		resolver: zodResolver(CompressFormSchema),
		defaultValues: {
			width: undefined,
			height: undefined,
			quality: undefined,
		},
	});

	const handleFormSubmit = async (
		values: z.infer<typeof CompressFormSchema>,
	) => {
		compressFile({
			id: fileId,
			file: values,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="space-y-3"
			>
				<div className="grid grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="width"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Width (PX)
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="input-field-sm"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="height"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Height (PX)
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="input-field-sm"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="quality"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormLabel className="field-label-sm">
									Quality (%)
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="input-field-sm"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-end">
					<Button type="submit" className="btn-primary-sm">
						{isPending ? (
							<div className="flex items-center gap-1">
								<Spinner className="h-[20px] w-[20px] stroke-white" />
								Compressing
							</div>
						) : (
							'Compress Now'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CompressFile;
