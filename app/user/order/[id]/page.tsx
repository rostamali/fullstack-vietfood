import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { CreditCard, Truck } from 'lucide-react';
import OrderList from './order-item-list';
import { fetchUserOrderDetails } from '@/lib/actions/order.action';
import {
	OrderStatusFormat,
	PaymentStatusFormat,
	dateFormat,
} from '@/lib/helpers/formater';
import { Button } from '@/components/ui/button';
import EmptyError from '@/components/elements/shared/empty-error';
import Link from 'next/link';
type SearchParams = {
	params: {
		id: string;
	};
};

const OrderDteailsPage = async ({ params }: SearchParams) => {
	const result = await fetchUserOrderDetails({
		orderId: params.id,
	});

	return (
		<div className="dashboard-col-space">
			{result ? (
				<>
					<DashboardPageTitle
						title={`Order Details`}
						links={[]}
						params={null}
					/>
					<div className="space-y-6">
						<div className="flex sm:items-center justify-between gap-3 max-xm:flex-col">
							<h4 className="heading-4">
								#Order: {result.orderId}
							</h4>
							<Button className="btn-primary-sm">
								Print Invoice
							</Button>
						</div>
						<div className="bg-white p-5 rounded-md space-y-4">
							<div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
								{result.summary.map((item, index) => (
									<div
										className="flex-center flex-col bg-gray-light py-5 rounded-md"
										key={index}
									>
										<h3 className="heading-3">
											${item.value.toFixed(2)}
										</h3>
										<p className="text-base-1">
											{item.label}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="grid md:grid-cols-2 gap-5">
							<div className="bg-white p-4 rounded-md space-y-4">
								<div className="flex items-center gap-3">
									<div className="h-[45px] w-[45px] bg-gray-light rounded-md flex-center text-primary-gray">
										<CreditCard size={20} />
									</div>
									<h5 className="heading-5 !font-medium">
										Order info
									</h5>
								</div>
								<div className="space-y-1.5">
									<p className="text-base-1">
										Order On:{' '}
										<span className="font-medium">
											{dateFormat(result.orderDate)}
										</span>
									</p>
									{result.paymentStaus && (
										<p className="text-base-1">
											Payment:{' '}
											<span className="font-medium">
												{
													PaymentStatusFormat[
														result.paymentStaus
													]
												}
											</span>
										</p>
									)}
									<p className="text-base-1">
										Order Status:{' '}
										<span className="font-medium">
											{
												OrderStatusFormat[
													result.orderStatus
												]
											}
										</span>
									</p>
								</div>
							</div>
							<div className="bg-white p-4 rounded-md space-y-4">
								<div className="flex items-center gap-3">
									<div className="h-[45px] w-[45px] bg-gray-light rounded-md flex-center text-primary-gray">
										<Truck size={20} />
									</div>
									<h5 className="heading-5 !font-medium">
										Shipping info
									</h5>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between items-start">
										<div className="flex flex-col gap-2 text-base-1 !font-medium">
											<span>{result.shipping.name}</span>
											<span>
												{result.shipping.mobile}
											</span>
										</div>
									</div>
									<p className="text-base-2">
										{result.shipping.address}
									</p>
								</div>
							</div>
						</div>
						<OrderList data={result.items} />
					</div>
				</>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'Invalid order ID'}
					description={`Oops! It looks like there are no order available at this ID. 🛍️ Please check the order ID and try again later! 🌟`}
					Links={
						<Link
							href="/user/order"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Go Back
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default OrderDteailsPage;
