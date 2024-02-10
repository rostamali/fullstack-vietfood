import { fetchShopProducts } from '@/lib/actions/shop.action';
import ProductCard from './product-card';
import ProductFilter from './product-filter';
import EmptyError from '@/components/elements/shared/empty-error';
import BannerSlider from '@/components/elements/slider/banner-slider';
import { ShopSlider } from '@/constants';
import Pagination from '@/components/elements/filters/pagination';

type SearchParams = {
	searchParams: {
		page: string;
		status: UserStatus;
		q: string | null;
	};
};

const ShopPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchShopProducts({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="shop-page py-[60px]">
			<div className="container">
				<div className="shop-layout space-y-10">
					<div className="grid xl:grid-cols-4 lg:gap-5 md:grid-cols-3 gap-5">
						<div className="bg-white md:order-1 order-2 rounded-md">
							<ProductFilter />
						</div>
						<div className="xl:col-span-3 md:col-span-2 overflow-hidden ,d:order-2 order-1">
							<BannerSlider
								containerClass={
									'border-b-2 border-action-success h-[350px]'
								}
								data={ShopSlider}
							/>
						</div>
					</div>
					<div className="shop-content">
						{result && result.products.length > 0 ? (
							<div className="space-y-10">
								<div className="grid xl:grid-cols-4 lg:gap-5 lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-4">
									{result.products.map((product, index) => (
										<ProductCard
											product={product}
											key={index}
										/>
									))}
								</div>
								<div className="flex-center">
									<Pagination
										pages={result.pages}
										containerClass={''}
										prevBtnClass={''}
										nextBtnClass={''}
										paginateBtnClass={''}
										paginateActiveClass={
											'bg-black-dark bg-opacity-10 text-black-dark'
										}
									/>
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
	);
};

export default ShopPage;
