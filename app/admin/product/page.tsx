import ProductList from '@/app/admin/product/product-list';
import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import { Button } from '@/components/ui/button';
import { fetchProductByAdmin } from '@/lib/actions/product.action';
import Link from 'next/link';
export const metadata = {
	title: 'Manage Products - Admin Dashboard',
};
type SearchParams = {
	searchParams: {
		page: string;
		status: string | null;
		q: string | null;
	};
};

const ProductAdminPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchProductByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
		status: searchParams.status ? searchParams.status.toUpperCase() : null,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle title={'Products'} links={[]} params={''} />
				<div className="flex items-center gap-[15px]">
					<Link href={`/admin/product/create`}>
						<Button className="btn-primary-lg">New Product</Button>
					</Link>
				</div>
			</div>
			<ProductList
				data={result ? result.products : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default ProductAdminPage;
