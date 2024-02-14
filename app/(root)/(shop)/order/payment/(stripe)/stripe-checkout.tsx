'use client';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './stripe-checkout-form';
import { useState } from 'react';
type StripeProps = {
	clientSecret: string | undefined;
	publishKey: string;
	orderId: string;
};

const StripeCheckout: React.FC<StripeProps> = ({
	clientSecret,
	publishKey,
	orderId,
}) => {
	const stripePromise = loadStripe(publishKey);

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: 'flat',
			variables: {
				colorPrimary: '#85BC39',
				colorBackground: '#ffffff',
				colorText: '#30313d',
				colorDanger: '#df1b41',
				fontFamily: '"Poppins"',
				spacingUnit: '6px',
				borderRadius: '8px',
				fontWeightNormal: 'normal',
			},
			rules: {
				'.Input::placeholder': {
					color: '#DBDBDB',
					fontSize: '15px',
				},
				'.Input': {
					border: `1px solid #4a494921`,
					padding: '13px 14px',
				},
				'.Label': {
					marginBottom: '10px',
					fontSize: '16px',
				},
				'.Input:focus': {
					boxShadow: `0 0 0 3px rgba(133, 188, 57, 0.5)`,
				},
				'.Error': {
					fontSize: '14px',
					fontWeight: 'normal',
				},
				'.Input--invalid': {
					boxShadow: `0 0 0 3px rgba(223, 27, 65, 0.4)`,
				},
			},
		},
		fonts: [
			{
				cssSrc: 'https://fonts.googleapis.com/css?family=Poppins',
			},
		],
	};

	return (
		<div className="card-wrapper">
			{clientSecret && publishKey && (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm
						clientSecret={clientSecret}
						orderId={orderId}
					/>
				</Elements>
			)}
		</div>
	);
};

export default StripeCheckout;
