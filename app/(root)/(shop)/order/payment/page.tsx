import StripeCheckout from '@/app/(root)/(shop)/order/payment/(stripe)/stripe-checkout';
import { getUserPaymentDetails } from '@/lib/actions/order.action';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
type SearchParams = {
	searchParams: {
		orderId: string | null;
	};
};

const PaymentPage = async ({ searchParams }: SearchParams) => {
	const result = await getUserPaymentDetails({
		orderId: searchParams.orderId,
	});
	return (
		<div className="py-[60px]">
			<div className="container">
				{result && (
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
