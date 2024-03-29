import ShipZoneForm from '@/app/admin/store/shipping/ship-zone-form';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { ShipPageLinks } from '@/constants';

const CreateShippingPage = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Create Zone'}
					links={ShipPageLinks}
					params={null}
				/>
			</div>
			<ShipZoneForm
				defaultValues={{
					type: 'CREATE',
					name: '',
					regions: null,
					flatMethod: null,
					freeMethod: null,
					pickupMethod: null,
				}}
			/>
		</div>
	);
};

export default CreateShippingPage;
