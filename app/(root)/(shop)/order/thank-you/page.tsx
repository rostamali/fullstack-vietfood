import { redirect } from 'next/navigation';
import PaymentSuccess from './payment-success';
export const metadata = {
	title: `Thank You for Shopping at Vietfood Online Store`,
	description: `Thank you for choosing Vietfood! Your order has been successfully processed. Enjoy your quality food products delivered straight to your doorstep.`,
};
type SearchParams = {
	searchParams: {
		orderId: string | null;
	};
};

const ThankYouPage = ({ searchParams }: SearchParams) => {
	if (!searchParams.orderId) redirect('/permission-error');

	return (
		<div className="thank-you-page py-[60px]">
			<div className="container">
				<div className="md:w-[550px] w-full mx-auto text-center">
					<PaymentSuccess orderId={searchParams.orderId} />
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
