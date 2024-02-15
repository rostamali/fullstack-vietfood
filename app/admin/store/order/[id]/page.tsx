import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { Button } from '@/components/ui/button';
import OrderDetailsForm from './order-details-form';
import { fetchOrderDetailsByAdmin } from '@/lib/actions/order.action';
import OrderItemList from '@/app/user/order/[id]/order-item-list';
import EmptyError from '@/components/elements/shared/empty-error';
import Link from 'next/link';
type SearchParams = {
	params: {
		id: string;
	};
};

const OrderDetailsPage = async ({ params }: SearchParams) => {
	const result = await fetchOrderDetailsByAdmin({
		orderId: params.id,
	});
	let formLoading = false;

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-4">
				<DashboardPageTitle
					title={'Order Details'}
					links={[]}
					params={null}
				/>
			</div>
			{result ? (
				<div className="order-details space-y-5">
					<div className="bg-white p-4 rounded-md">
						<div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
							{result.summary.map((item, index) => (
								<div
									className="flex-center flex-col bg-gray-light py-5 rounded-md"
									key={index}
								>
									<h3 className="heading-3">
										${item.value.toFixed(2)}
									</h3>
									<p className="text-base-1">{item.label}</p>
								</div>
							))}
						</div>
					</div>
					<OrderDetailsForm
						defaultValues={result.shipping}
						id={result.orderId}
						orderInfo={result.orderInfo}
						loading={formLoading}
					/>

					<OrderItemList data={result.items} />
				</div>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'Invalid order ID'}
					description={`Oops! It looks like there are no order available at this ID. 🛍️ Please check the order ID and try again later! 🌟`}
					Links={
						<Link
							href="/admin/store/order"
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

export default OrderDetailsPage;
