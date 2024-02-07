import Link from 'next/link';
import CheckedIcon from './checked-icon';
import { Button } from '@/components/ui/button';

const ThankYouPage = () => {
	return (
		<div className="thank-you-page py-[60px]">
			<div className="container">
				<div className="md:w-[550px] w-full mx-auto text-center">
					<div className="w-[180px] mx-auto">
						<CheckedIcon />
					</div>
					<div className="space-y-4">
						<h2 className="heading-2">Thanks For Your Order !</h2>
						<p className="text-base-1">
							Thanks for placing order SHOPER42712, you will
							receive a confirmation email if not contact{' '}
							<Link
								href="mailto:info@company.com"
								className="text-primary-green"
							>
								info@company.com
							</Link>
						</p>
						<Link href="/shop" className="inline-block">
							<Button className="btn-primary-lg">
								View Order Details
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
