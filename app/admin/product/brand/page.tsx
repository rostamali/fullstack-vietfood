import NewBrand from '@/components/shared/modals/new-brand';
import UploadCSV from '@/components/shared/modals/upload-csv';
import BrandList from '@/components/shared/tables/brand-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { fetchBrandByAdmin } from '@/lib/actions/brand.action';
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};

const BrandPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchBrandByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle title={'Brands'} links={[]} />
				<div className="flex items-center gap-[15px]">
					<NewBrand />
					<UploadCSV type={'BRAND'} />
				</div>
			</div>
			<BrandList
				data={result ? result.brands : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default BrandPage;
