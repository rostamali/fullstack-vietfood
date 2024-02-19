import CreateUser from '@/components/elements/modals/create-user';
import UploadCSV from '@/components/elements/modals/upload-csv';
import UserList from '@/app/admin/user/user-list';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { fetchUsersByAdmin } from '@/lib/actions/auth.action';
type SearchParams = {
	searchParams: {
		page: string;
		status: UserStatus;
		q: string | null;
	};
};
export const metadata = {
	title: 'Manage Users - Admin Dashboard',
};
const UsersPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchUsersByAdmin({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as UserStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle title={'Users'} links={[]} params={null} />
				<div className="flex items-center gap-[15px]">
					<CreateUser />
				</div>
			</div>
			<UserList
				data={result ? result.users : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default UsersPage;
