import NewCategory from '@/components/shared/modals/new-category';
import UploadCSV from '@/components/shared/modals/upload-csv';
import CategoryList from '@/components/shared/tables/category-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { fetchCategoryByAdmin } from '@/lib/actions/category.action';
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};

const CategoryPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchCategoryByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Categories'}
					links={[]}
					params={null}
				/>
				<div className="flex items-center gap-[15px]">
					<div className="max-xm:hidden">
						<NewCategory />
					</div>
					<UploadCSV type={'CATEGORY'} />
				</div>
			</div>
			<CategoryList
				data={result ? result.categories : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default CategoryPage;
