import ProductForm from '@/app/admin/product/create/product-form';
import EmptyError from '@/components/elements/shared/empty-error';
import { fetchProductById } from '@/lib/actions/product.action';
import Link from 'next/link';

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
						description: result.description,
						thumbnail: result.thumbnail ? [result.thumbnail] : null,
						gallery: result?.gallery
							? result?.gallery?.files
								? result?.gallery.files
								: null
							: null,
						retailPrice: result.inventory?.retailPrice || undefined,
						regularPrice:
							result.inventory?.regularPrice || undefined,
						salePrice: result.inventory?.salePrice || undefined,
						taxStatus: result.taxStatus,
						sku: result.inventory?.sku || '',
						stockQTY: result.inventory?.stockQTY || undefined,
						stockStatus: result.inventory?.inStock || false,
						threshold: result.inventory?.threshold || undefined,
						soldIndividual:
							result.inventory?.soldIndividual || false,
						weight: result.weight || undefined,
						shipClass: result.shipClass ? result.shipClass : null,
						status: result.status,
						category: result.category ? result.category : null,
						brand: result.brand ? result.brand : null,
						label: result.label || '',
						collection: result.collection,
					}}
					pageTitle={'Update Product'}
					id={result.id}
				/>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'No products found'}
					description={`Oops! The product with the specified ID could not be found. 🚫 Please double-check the ID or explore other areas of our product catalog 🌟`}
					Links={
						<Link
							href="/admin/product"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Go to Products
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default UpdateProduct;
