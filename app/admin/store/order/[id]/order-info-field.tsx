import { Box } from 'lucide-react';
import PaymentStatus from '../payment-status';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { OrderDetailsFormSchema } from '@/lib/helpers/form-validation';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import SelectField from '@/components/elements/select/select-field';
import { OrderStatus } from '@/constants';
import { Input } from '@/components/ui/input';
type InfoProps = {
	orderDetails: {
		label: string;
		value: string;
	}[];
	form: UseFormReturn<z.infer<typeof OrderDetailsFormSchema>>;
};

const OrderInfoField: React.FC<InfoProps> = ({ orderDetails, form }) => {
	return (
		<div className="bg-white p-4 rounded-md form-flex-space">
			<div className="flex gap-3 justify-between">
				<div className="flex items-center gap-3">
					<div className="h-[45px] w-[45px] bg-gray-light rounded-md flex-center text-primary-gray">
						<Box size={18} />
					</div>
					<h5 className="heading-5 !font-medium">Order info</h5>
				</div>
				<PaymentStatus status="PAID" className={''} />
			</div>
			<div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
				{orderDetails.map((item, index) => (
					<div className="space-y-2" key={index}>
						<h6 className="heading-6 !font-medium">{item.label}</h6>
						<p className="text-base-1">{item.value}</p>
					</div>
				))}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-lg">
								User Email
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
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-lg">
								Order Status
							</FormLabel>
							<FormControl>
								<SelectField
									triggerClass={'input-field-sm bg-white'}
									placeholder={'Select status...'}
									defaultValue={field.value}
									onChange={field.onChange}
									options={OrderStatus}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};

export default OrderInfoField;
