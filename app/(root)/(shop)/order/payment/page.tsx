import StripeCheckout from '@/components/elements/forms/stripe/stripe-checkout';
import CartSummray from '../cart-summray';
import { getUserPaymentDetails } from '@/lib/actions/order.action';
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
					<div className="grid grid-cols-5 gap-5">
						<div className="col-span-3">
							<CartSummray summary={result.summary} />
						</div>
						<div className="col-span-2">
							<div className="bg-white p-4 rounded-md">
								<StripeCheckout />
							</div>
						</div>
					</div>
				)}

				<div className="w-[450px] bg-white p-4 rounded-md">
					<StripeCheckout />
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
