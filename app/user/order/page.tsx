import { fetchUserOrders } from '@/lib/actions/order.action';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import LocalSearch from '@/components/elements/filters/local-search';
import SelectFilter from '@/components/elements/filters/select-filter';
import { OrderStatus } from '@/constants';
import OrderList from './order-list';
export const metadata = {
	title: 'My Orders - Vietfood User Dashboard',
};

type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
		status: string | null;
	};
};

const UserOrdersPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchUserOrders({
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		pageSize: 2,
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
			<div className="grid grid-cols-[210px,1fr] max-sm:grid-cols-1 gap-5 max-sm:gap-2">
				<div>
					<SelectFilter
						filterKey={'status'}
						placeholder={'Filter by status'}
						triggerClass={'input-field-lg bg-white'}
						contentClass={'bg-white'}
						options={OrderStatus}
					/>
				</div>
				<div className="flex flex-1 gap-4">
					<LocalSearch
						route={'/user/order'}
						iconPosition={'left'}
						placeholder={'Search by order ID'}
						containerClass={
							'bg-white border border-primary-gray border-opacity-15 w-full'
						}
						inputClass={'h-[50px]'}
						iconClass={''}
					/>
				</div>
			</div>
			<OrderList data={result ? result.orders : []} />
		</div>
	);
};

export default UserOrdersPage;
