import { fetchProductBySlug } from '@/lib/actions/product.action';
import ProductGallery from '../product-gallery';
import PriceFormat from '@/components/elements/shared/price-format';
import Link from 'next/link';
import SocialShare from '../social-share';
import StarTating from '../star-rating';
import AddToCart from '../add-to-cart';
import EmptyError from '@/components/elements/shared/empty-error';
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
				{result ? (
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="">
							{result && (
								<ProductGallery
									gallery={result.gallery}
									alt={result.name}
								/>
							)}
						</div>
						<div className="flex flex-col gap-5 items-start">
							<h3 className="heading-3">{result?.name}</h3>
							<div className="flex flex-col gap-4">
								<PriceFormat
									saleClass="text-[22px]"
									regularClass="text-[18px]"
									inventory={result?.inventory}
								/>
								<div className="flex items-center gap-2">
									<StarTating rating={3.5} />
									<span className="text-base-2">
										12 Ratings
									</span>
								</div>
								<div className="flex items-center gap-1.5 text-base-2">
									<span>Availability:</span>
									{result.inventory.inStock ? (
										<span className="text-primary-green !font-medium">
											Instock
										</span>
									) : (
										<span className="text-action-danger !font-medium">
											Stock Out
										</span>
									)}
								</div>
							</div>
							<AddToCart productId={result?.id} />
							<div className="flex items-center gap-1.5 text-base-2">
								<span>Category:</span>
								<span className="font-medium">T-Shirt</span>
							</div>
							<div className="flex items-center gap-1.5 text-base-2">
								<span>Brand:</span>
								<span className="font-medium">Amazon HP</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="heading-6 !font-semibold">
									Share:
								</span>
								<SocialShare shareUrl={''} />
							</div>
						</div>
					</div>
				) : (
					<EmptyError
						contentClass={
							'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
						}
						title={'No product found to show'}
						description={`Oops! Currently, there are no product to display. 🏷️ It seems the product is not exist anymore! 🌟`}
						Links={
							<Link
								href="/shop"
								className="btn-navlink btn-navlink-active !w-auto"
							>
								Go Back
							</Link>
						}
					/>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
