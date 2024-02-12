import Stripe from 'stripe';
import prisma from '../../../lib/prisma';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: NextRequest) {
	const rawBody = await req.text();
	const signature = headers().get('stripe-signature') as string;

	if (!signature)
		return new Response(`Stripe signature is required`, {
			status: 400,
		});

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		return new Response(`Webhook Error: ${err}`, {
			status: 400,
		});
	}

	switch (event.type) {
		case 'charge.succeeded':
			const paymentSucceeded = event.data.object;

			if (typeof paymentSucceeded.payment_intent === 'string') {
				await prisma.paymentInfo.update({
					where: {
						paymentIntentId: paymentSucceeded.payment_intent,
					},
					data: {
						status: 'PAID',
					},
				});
			}
			break;

		default:
			break;
	}

	return new Response('RESPONSE EXECUTE', {
		status: 200,
	});
}
