import ProductForm from '@/components/ecom/product/product-form';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProductActionPage = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Products'}
					links={[]}
					params={null}
				/>
				<div className="flex items-center gap-[15px]">
					<Link href={`/admin/product/edit?type=create`}>
						<Button className="btn-primary-lg">Visit Now</Button>
					</Link>
				</div>
			</div>
			<ProductForm />
		</div>
	);
};

export default ProductActionPage;
