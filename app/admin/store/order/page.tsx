import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import OrderList from './order-list';
import { fetchOrdersByAdmin } from '@/lib/actions/order.action';
export const metadata = {
	title: 'Manage Orders - Admin Dashboard',
};
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
		status: string | null;
	};
};

const OrderPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchOrdersByAdmin({
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		pageSize: 6,
		query: searchParams.q ? searchParams.q : null,
		status: searchParams.status ? searchParams.status.toUpperCase() : null,
	});

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Order List'}
					links={[]}
					params={null}
				/>
			</div>
			<OrderList
				data={result ? result.orders : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default OrderPage;
