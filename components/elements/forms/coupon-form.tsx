'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { BrandFormSchema } from '@/lib/helpers/form-validation';
import { Button } from '@/components/ui/button';

const CouponForm = () => {
	const form = useForm<z.infer<typeof BrandFormSchema>>({
		resolver: zodResolver(BrandFormSchema),
	});
	const handleCoupon = async (data: z.infer<typeof BrandFormSchema>) => {};

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleCoupon)}
			>
				<div className="flex items-center justify-between gap-2.5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Coupon Code"
										className="input-field-sm"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<Button className="btn-primary-sm">Apply</Button>
				</div>
			</form>
		</Form>
	);
};

export default CouponForm;
