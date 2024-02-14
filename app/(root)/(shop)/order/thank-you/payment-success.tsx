import Link from 'next/link';
import CheckedIcon from './checked-icon';
import { Button } from '@/components/ui/button';

const PaymentSuccess = ({ orderId }: { orderId: string }) => {
	return (
		<div className="text-center">
			<div className="w-[150px] mx-auto">
				<CheckedIcon />
			</div>
			<div className="space-y-4">
				<h2 className="heading-2">Thanks For Your Order !</h2>
				<p className="text-base-1 leading-7">
					Thanks for placing order{' '}
					<span className="text-action-success">{orderId}</span>, you
					will receive a confirmation email if not contact{' '}
					<Link
						href="mailto:info@company.com"
						className="text-primary-green"
					>
						info@company.com
					</Link>
				</p>
				<Link href={`/user/order/${orderId}`} className="inline-block">
					<Button className="btn-primary-lg">
						View Order Details
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default PaymentSuccess;
