import { Button } from '@/components/ui/button';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { useEffect, useState, FC } from 'react';
type FormProps = {
	clientSecret: string;
};

const StripeCheckoutForm: FC<FormProps> = ({ clientSecret }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

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

		console.log('Elements ->', elements);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: 'http://localhost:3000',
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message as string);
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};
	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			<Button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="btn-primary-sm"
			>
				<span id="button-text">
					{isLoading ? (
						<div className="spinner" id="spinner"></div>
					) : (
						'Pay now'
					)}
				</span>
			</Button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};

export default StripeCheckoutForm;
