import UploadFile from '@/components/shared/modals/upload-file';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';

const UserAddressPage = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Address'}
					links={[]}
					params={null}
				/>
				<UploadFile />
			</div>
		</div>
	);
};

export default UserAddressPage;
