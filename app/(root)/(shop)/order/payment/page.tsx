import StripeCheckout from '@/app/(root)/(shop)/order/payment/(stripe)/stripe-checkout';
import { getOrderPaymentDetails } from '@/lib/actions/order.action';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PaymentSuccess from '../thank-you/payment-success';
type SearchParams = {
	searchParams: {
		orderId: string | null;
	};
};

const PaymentPage = async ({ searchParams }: SearchParams) => {
	const result = await getOrderPaymentDetails({
		orderId: searchParams.orderId,
	});

	if (!result) redirect('/permission-error');

	return (
		<div className="py-[60px]">
			<div className="container">
				{result.paymentStatus === 'PAID' ? (
					<div className="md:w-[450px] w-full mx-auto">
						<PaymentSuccess orderId={result.orderId} />
					</div>
				) : (
					<div className="w-[450px] mx-auto space-y-8 bg-white p-6 rounded-md">
						<div className="space-y-4">
							<Link
								href="/user/account"
								className="text-base-1 !text-action-success"
							>
								<div className="flex items-center">
									<ChevronLeft size={15} />
									<span>My Account</span>
								</div>
							</Link>
							<div className="space-y-2">
								<h2 className="heading-2">Payment amount</h2>
								<h5 className="heading-4">
									${result.total.toFixed(2)}
								</h5>
							</div>
						</div>
						<StripeCheckout
							orderId={result.orderId}
							clientSecret={result.clientSecret}
							publishKey={result.publishKey}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PaymentPage;
