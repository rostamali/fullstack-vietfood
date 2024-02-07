import ProductForm from '@/app/admin/product/create/product-form';
const ProductActionPage = () => {
	return (
		<div className="dashboard-col-space">
			<ProductForm
				defaultValues={{
					type: 'CREATE',
					name: '',
					excerpt: '',
					description: '',
					thumbnail: null,
					gallery: null,
					retailPrice: undefined,
					regularPrice: undefined,
					salePrice: undefined,
					sku: '',
					stockQTY: undefined,
					stockStatus: false,
					threshold: undefined,
					soldIndividual: false,
					taxStatus: 'NONE',
					taxClass: '',
					weight: undefined,
					shipClass: '',
					status: '',
					category: null,
					brand: null,
					label: '',
				}}
				pageTitle={'Create Product'}
			/>
		</div>
	);
};

export default ProductActionPage;
