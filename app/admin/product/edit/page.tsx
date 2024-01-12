import ProductForm from '@/components/ecom/product/product-form';
import { fetchProductById } from '@/lib/actions/product.action';

type SearchParams = {
	searchParams: {
		product_id: string;
	};
};
const UpdateProduct = async ({ searchParams }: SearchParams) => {
	const result = await fetchProductById({
		id: searchParams.product_id,
	});
	return (
		<div className="dashboard-col-space">
			{result ? (
				<ProductForm
					defaultValues={{
						type: 'UPDATE',
						name: result.name,
						excerpt: result.excerpt ? result.excerpt : '',
						description: result.description
							? result.description
							: '',
						thumbnail: result.thumbnail ? [result.thumbnail] : null,
						gallery: result?.gallery
							? result?.gallery?.files
								? result?.gallery.files
								: []
							: [],
						retailPrice: result.inventory?.retailPrice || undefined,
						regularPrice:
							result.inventory?.regularPrice || undefined,
						salePrice: result.inventory?.salePrice || undefined,
						taxStatus: result.taxStatus,
						taxClass: result.taxClass || '',
						sku: result.inventory?.sku || '',
						stockQty: result.inventory?.stockQTY || undefined,
						stockStatus: result.inventory?.inStock || false,
						threshold: result.inventory?.threshold || undefined,
						soldIndividual:
							result.inventory?.soldIndividual || false,
						weight: result.weight || undefined,
						shipClass: '',
						status: result.status,
						category:
							result.categories?.length > 0
								? result?.categories[0]?.category.slug
								: null,
						brand: null,
						label: result.label || '',
					}}
					pageTitle={'Update Product'}
					id={result.id}
				/>
			) : (
				'Empty'
			)}
		</div>
	);
};

export default UpdateProduct;
