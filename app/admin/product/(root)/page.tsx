import UploadCSV from '@/components/shared/modals/upload-csv';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { Button } from '@/components/ui/button';
import { ProductPageLinks } from '@/constants';
import Link from 'next/link';

const ProductList = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Products'}
					links={ProductPageLinks}
					params={'status'}
				/>
				<div className="flex items-center gap-[15px]">
					<Link href={`/admin/product/edit?type=create`}>
						<Button className="btn-primary-lg">New Product</Button>
					</Link>
					<UploadCSV type={'BRAND'} />
				</div>
			</div>
		</div>
	);
};

export default ProductList;
