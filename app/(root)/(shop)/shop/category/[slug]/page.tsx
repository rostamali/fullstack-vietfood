import LocalSearch from '@/components/elements/filters/local-search';
import { fetchProductByCategory } from '@/lib/actions/shop.action';
import ProductCard from '../../product-card';
import Pagination from '@/components/elements/filters/pagination';
import EmptyError from '@/components/elements/shared/empty-error';

type PageProps = {
	params: {
		slug: string;
	};
	searchParams: {
		page: string;
		q: string | null;
	};
};
const CategoryDetails = async ({ params, searchParams }: PageProps) => {
	const result = await fetchProductByCategory({
		slug: params.slug,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		pageSize: 8,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="category-details py-[60px]">
			<div className="container space-y-16">
				<div className="h-[280px] rounded-md p-5 flex flex-col justify-center gap-3 category-bg">
					<h3 className="heading-3 !text-white">
						Product on categories
					</h3>
					<LocalSearch
						route={`/shop/category/${params.slug}`}
						iconPosition={'left'}
						placeholder={'Search by name'}
						containerClass={
							'bg-white border border-primary-gray border-opacity-15 col-span-3 sm:w-[350px] w-full'
						}
						inputClass={'h-[50px]'}
						iconClass={''}
					/>
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
	);
};

export default CategoryDetails;
