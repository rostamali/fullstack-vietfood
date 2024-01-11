import ProductForm from '@/components/ecom/product/product-form';
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
					taxStatus: 'NONE',
					taxClass: '',
					sku: '',
					stockQty: undefined,
					stockStatus: false,
					threshold: undefined,
					soldIndividual: false,
					weight: undefined,
					shipClass: '',
					status: '',
					category: null,
					brand: null,
					label: '',
				}}
			/>
		</div>
	);
};

export default ProductActionPage;
