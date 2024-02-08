import { fetchShopProducts } from '@/lib/actions/product.action';
import ProductCard from './product-card';
import ProductCardSm from './product-card-sm';
import ProductFilter from './product-filter';
import EmptyError from '@/components/elements/shared/empty-error';

type SearchParams = {
	searchParams: {
		page: string;
		status: UserStatus;
		q: string | null;
	};
};

const ShopPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchShopProducts({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="shop-page py-[60px]">
			<div className="container">
				<div className="shop-layout">
					<div className="grid lg:grid-cols-[320px,1fr] sm:grid-cols-[250px,1fr] gir-cols-1 gap-[25px]">
						<div className="shop-sidebar">
							<ProductFilter />
							<div className="mt-6">
								<h5 className="heading-5 mb-3">New Products</h5>
								<div className="flex flex-col gap-2">
									{result &&
										result?.products
											.slice(0, 4)
											.map((product, index) => (
												<ProductCardSm
													key={index}
													name={product.name}
													thumbnail={
														product.thumbnail
													}
												/>
											))}
								</div>
							</div>
						</div>
						<div className="shop-content">
							{result && result.products.length > 0 ? (
								<div className="">
									<div className="grid xl:grid-cols-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-2 grid-cols-2 lg:gap-[20px] gap-2">
										{result.products.map(
											(product, index) => (
												<ProductCard
													product={product}
													key={index}
												/>
											),
										)}
									</div>
								</div>
							) : (
								<EmptyError
									contentClass={
										'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
									}
									title={'No products available'}
									description={`Oops! It looks like there are no products available right now. 🛍️ Add new products to keep your catalog vibrant and exciting! 🌟`}
									Links={
										<a
											href="/shop"
											className="btn-navlink btn-navlink-active !w-auto"
										>
											Reload Now
										</a>
									}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopPage;
