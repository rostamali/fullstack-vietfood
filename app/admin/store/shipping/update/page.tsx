import ShipZoneForm from '@/components/ecom/shipping/ship-zone-form';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import EmptyError from '@/components/shared/ui/empty-error';
import { ShipPageLinks } from '@/constants';
import { fetchZoneDetailsById } from '@/lib/actions/ship.action';
import Link from 'next/link';

type SearchParams = {
	searchParams: {
		zone_id: string;
	};
};
const UpdateShipZone = async ({ searchParams }: SearchParams) => {
	const result = await fetchZoneDetailsById({
		id: searchParams.zone_id,
	});
	return (
		<div className="dashboard-col-space">
			{result ? (
				<>
					<div className="flex items-center justify-between gap-[40px]">
						<DashboardPageTitle
							title={'Update Zone'}
							links={ShipPageLinks}
							params={null}
						/>
						<ShipZoneForm
							defaultValues={{
								type: 'UPDATE',
								name: result.name,
								regions: result.regions || null,
								flatMethod: result.flatMethod
									? result.flatMethod
									: null,
								freeMethod: result.freeMethod
									? result.freeMethod
									: null,
								pickupMethod: result.pickupMethod
									? result.pickupMethod
									: null,
							}}
							id={result.id}
						/>
					</div>
				</>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'No zone found to show'}
					description={`Oops! It seems there are no zone available to display at the moment. 🚛 Feel free to add new zone to enhance this space 🌟`}
					Links={
						<Link
							href="/admin/store/shipping/create"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Create Zone
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default UpdateShipZone;
