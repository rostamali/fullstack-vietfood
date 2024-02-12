'use client';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './stripe-checkout-form';

const stripePromise = loadStripe(
	'pk_test_51KUQHREBn2ix5PoMdvEe7VKS8O3MoBppthWMLC6OolTKmD0ZdZYSMNB5hKDzhaYiojji5vZyn8egg5XnxeA0Oq5u00mP2pO4tf',
);

const StripeCheckout = () => {
	const clientSecret =
		'pi_3Oic3UEBn2ix5PoM02JahuJ9_secret_Lm4B9htujuGu8cicdmj8dCe41';

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: 'stripe',
			labels: 'floating',
		},
	};
	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm clientSecret={clientSecret} />
				</Elements>
			)}
		</div>
	);
};

export default StripeCheckout;
