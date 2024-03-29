import ShipZoneForm from '@/app/admin/store/shipping/ship-zone-form';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import EmptyError from '@/components/elements/shared/empty-error';
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
					<div className="dashboard-col-space">
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
