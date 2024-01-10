import ShipZoneModal from '@/components/ecom/shipping/ship-zone-modal';
import ShipZoneList from '@/components/shared/tables/ship-zone-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { ShipPageLinks } from '@/constants';
import { fetchZoneByAdmin } from '@/lib/actions/ship.action';
type SearchParams = {
	searchParams: {
		page: string;
	};
};
const ShippingPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchZoneByAdmin({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Shipping Zones'}
					links={ShipPageLinks}
					params={null}
				/>
				<div className="flex items-center gap-[15px]">
					<ShipZoneModal />
				</div>
			</div>
			<ShipZoneList
				data={result ? result.zones : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default ShippingPage;
