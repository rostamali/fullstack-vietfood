import { ToastError } from '@/components/elements/shared/custom-toast';
import Spinner from '@/components/elements/shared/spinner';
import { Button } from '@/components/ui/button';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FC } from 'react';
import { toast } from 'sonner';
type FormProps = {
	clientSecret: string;
	orderId: string;
};

const StripeCheckoutForm: FC<FormProps> = ({ clientSecret, orderId }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!stripe) return;
		if (!clientSecret) return;
	}, [stripe]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		await stripe
			.confirmPayment({
				elements,
				redirect: 'if_required',
			})
			.then((result) => {
				if (!result.error) {
					setIsLoading(false);
					router.push(`/order/thank-you?orderId=${orderId}`);
				} else {
					setIsLoading(false);
					toast.custom((t) => (
						<ToastError
							toastNumber={t}
							content={
								result.error.message || `Something went wrong`
							}
						/>
					));
				}
			});
	};
	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement
				id="payment-element"
				options={{
					layout: 'tabs',
				}}
			/>
			<Button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="btn-primary-sm mt-4 w-full"
			>
				{isLoading ? (
					<div className="flex items-center gap-1.5">
						<Spinner className="h-[20px] w-[20px] stroke-white" />
						<span>Processing</span>
					</div>
				) : (
					<div className="flex items-center gap-1.5">
						<Lock size={17} />
						<span className="mt-[2px]">Pay now</span>
					</div>
				)}
			</Button>
		</form>
	);
};

export default StripeCheckoutForm;
