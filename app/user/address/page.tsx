import CreateAddress from '@/components/elements/modals/create-address';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import AddressCard from './address-card';
import { fetchAddresses } from '@/lib/actions/address.action';
export const metadata = {
	title: 'My Addresses - Vietfood User Dashboard',
};

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
			<AddressCard address={result ? result : []} />
		</div>
	);
};

export default UserAddressPage;
