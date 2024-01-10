import ShipZoneModal from '@/components/ecom/shipping/ship-zone-modal';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { ShipPageLinks } from '@/constants';

const ShippingPage = () => {
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
		</div>
	);
};

export default ShippingPage;
