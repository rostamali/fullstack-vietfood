import { fetchProductBySlug } from '@/lib/actions/product.action';
import ProductGallery from '../product-gallery';
import PriceFormat from '@/components/shared/ui/price-format';
type SearchParams = {
	params: {
		slug: string;
	};
};

const ProductDetails = async ({ params }: SearchParams) => {
	const result = await fetchProductBySlug({
		slug: params.slug,
	});
	return (
		<div className="product-details py-[60px]">
			<div className="container">
				{result && (
					<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px]">
						<div className="">
							{result && (
								<ProductGallery
									gallery={result.gallery}
									alt={result.name}
								/>
							)}
						</div>
						<div className="">
							<h2 className="heading-4">{result?.name}</h2>
							<PriceFormat inventory={result?.inventory} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
