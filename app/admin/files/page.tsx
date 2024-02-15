import UploadFile from '@/components/elements/modals/upload-files';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import FileLibrary from '@/components/media/files/file-library';
import { fetchFilesByAdmin } from '@/lib/actions/file.action';
export const metadata = {
	title: 'File Management - Admin Dashboard',
};
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};

const FilesPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchFilesByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		type: searchParams.type ? searchParams.type : null,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle title={'Files'} links={[]} params={null} />
				<UploadFile />
			</div>
			<FileLibrary
				files={result ? result.files : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default FilesPage;
