'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckoutFormSchema } from '@/lib/helpers/form-validation';
import { useCreateOrder } from '@/lib/hooks/useOrder';
type FormProps = {
	cartId: string;
};

const CheckoutForm: React.FC<FormProps> = ({ cartId }) => {
	const { mutate: createOrder, isPending } = useCreateOrder();
	const form = useForm<z.infer<typeof CheckoutFormSchema>>({
		resolver: zodResolver(CheckoutFormSchema),
		defaultValues: {
			paymentMethod: 'card',
		},
	});
	const handleCreateOrder = (data: z.infer<typeof CheckoutFormSchema>) => {
		createOrder({
			cartId,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreateOrder)}
				id="checkout-form"
			>
				<FormField
					control={form.control}
					name="paymentMethod"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem
												value="card"
												className="radio-sm"
											/>
										</FormControl>
										<FormLabel className="font-normal">
											Card Stripe
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default CheckoutForm;
