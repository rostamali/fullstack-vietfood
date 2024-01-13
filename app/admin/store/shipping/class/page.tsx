import ShipClass from '@/components/ecom/shipping/ship-class-modal';
import ShipClassList from '@/components/shared/tables/ship-class-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { ShipPageLinks } from '@/constants';
import { fetchShipClassByAdmin } from '@/lib/actions/ship.action';
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
					<ShipClass />
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
