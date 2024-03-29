import CreateCategory from '@/components/elements/modals/create-category';
import CategoryList from '@/app/admin/store/category/category-list';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { fetchCategoryByAdmin } from '@/lib/actions/category.action';
export const metadata = {
	title: 'Product Categories - Admin Dashboard',
};
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
						<CreateCategory />
					</div>
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
