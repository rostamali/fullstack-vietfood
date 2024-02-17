'use server';
import { Currency } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

interface IntentProps {
	total: number;
	currency: Currency;
}
export const createPaymentIntent = async (params: IntentProps) => {
	try {
		const { currency, total } = params;
		const totalCharge = parseFloat(total.toFixed(2));
		const totalAmount = totalCharge * 100;
		const paymentIntent = await stripe.paymentIntents.create({
			amount: parseFloat(totalAmount.toFixed(2)),
			currency: currency,
			automatic_payment_methods: { enabled: true },
		});

		return {
			paymentIntent: paymentIntent.id,
			clientSecret: paymentIntent.client_secret,
		};
	} catch (error) {
		return;
	}
};
