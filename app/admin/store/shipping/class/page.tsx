import CreateClass from '@/components/elements/modals/create-class';
import ShipClassList from '@/app/admin/store/shipping/class/ship-class-list';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { ShipPageLinks } from '@/constants';
import { fetchShipClassByAdmin } from '@/lib/actions/ship.action';
export const metadata = {
	title: 'Shipping Classes - Admin Dashboard',
};
type SearchParams = {
	searchParams: {
		page: string;
	};
};

const ShippingClass = async ({ searchParams }: SearchParams) => {
	const result = await fetchShipClassByAdmin({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
	});

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Shipping Class'}
					links={ShipPageLinks}
					params={null}
				/>
				<div className="flex items-center gap-[15px]">
					<CreateClass />
				</div>
			</div>
			<ShipClassList
				data={result ? result?.shipClass : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default ShippingClass;
