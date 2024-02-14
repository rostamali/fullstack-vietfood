import { redirect } from 'next/navigation';
import PaymentSuccess from './payment-success';
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
