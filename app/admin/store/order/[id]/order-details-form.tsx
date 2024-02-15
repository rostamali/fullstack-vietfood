'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OrderDetailsFormSchema } from '@/lib/helpers/form-validation';
import ShippingField from './shipping-field';
import OrderInfoField from './order-info-field';
import { useUpdateOrder } from '@/lib/hooks/useOrder';
type FormProps = {
	defaultValues: z.infer<typeof OrderDetailsFormSchema>;
	id: string;
	orderInfo: {
		label: string;
		value: string;
	}[];
	loading: boolean;
};

const OrderDetailsForm: React.FC<FormProps> = ({
	defaultValues,
	orderInfo,
	loading,
	id,
}) => {
	const { mutate: orderUpdate, isPending } = useUpdateOrder();
	const form = useForm<z.infer<typeof OrderDetailsFormSchema>>({
		resolver: zodResolver(OrderDetailsFormSchema),
		defaultValues,
	});
	const handleOrderDetails = async (
		data: z.infer<typeof OrderDetailsFormSchema>,
	) => {
		orderUpdate({
			orderId: id,
			values: data,
		});
	};

	return (
		<div className="order-details-form">
			<Form {...form}>
				<form
					id="order-form-info"
					className="form-flex-space"
					onSubmit={form.handleSubmit(handleOrderDetails)}
				>
					<OrderInfoField form={form} orderDetails={orderInfo} />
					<ShippingField form={form} isLoading={isPending} />
				</form>
			</Form>
		</div>
	);
};

export default OrderDetailsForm;
