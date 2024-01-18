import CreateAddress from '@/components/shared/modals/create-address';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import AddressCard from './address-card';
import { fetchAddresses } from '@/lib/actions/address.action';

const UserAddressPage = async () => {
	const result = await fetchAddresses();

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Address'}
					links={[]}
					params={null}
				/>
				<CreateAddress triggerClass={'btn-primary-lg'} />
			</div>
			{result && <AddressCard address={result} />}
		</div>
	);
};

export default UserAddressPage;
