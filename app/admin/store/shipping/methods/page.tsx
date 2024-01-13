import ShipMethodModal from '@/components/ecom/shipping/ship-method-modal';
import ShipMethodList from '@/components/shared/tables/ship-method-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { ShipPageLinks } from '@/constants';
import { fetchMethodByAdmin } from '@/lib/actions/ship.action';
type SearchParams = {
	searchParams: {
		page: string;
	};
};

const ShippingMethods = async ({ searchParams }: SearchParams) => {
	const result = await fetchMethodByAdmin({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Shipping Methods'}
					links={ShipPageLinks}
					params={null}
				/>
				<div className="flex items-center gap-[15px]">
					<ShipMethodModal />
				</div>
			</div>
			<ShipMethodList
				data={result ? result?.methods : []}
				pages={result ? result?.pages : 0}
			/>
		</div>
	);
};

export default ShippingMethods;
