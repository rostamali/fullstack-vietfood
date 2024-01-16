import ShipZoneList from '@/components/shared/tables/ship-zone-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { Button } from '@/components/ui/button';
import { ShipPageLinks } from '@/constants';
import { fetchShipZoneByAdmin } from '@/lib/actions/ship.action';
import Link from 'next/link';
type SearchParams = {
	searchParams: {
		page: string;
	};
};
const ShippingPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchShipZoneByAdmin({
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
					<Link href="/admin/store/shipping/create">
						<Button className="btn-primary-sm">Create Zone</Button>
					</Link>
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