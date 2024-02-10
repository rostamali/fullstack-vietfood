import LocalSearch from '@/components/elements/filters/local-search';
import Pagination from '@/components/elements/filters/pagination';
import CategoryCard from '@/components/elements/shared/category-card';
import EmptyError from '@/components/elements/shared/empty-error';
import { fetchCategoriesByUser } from '@/lib/actions/shop.action';
type SearchParams = {
	searchParams: {
		page: string;
		q: string | null;
	};
};

const ProductCategories = async ({ searchParams }: SearchParams) => {
	const result = await fetchCategoriesByUser({
		pageSize: 12,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="categories py-[60px]">
			<div className="container space-y-16">
				<div className="h-[280px] rounded-md p-5 flex flex-col justify-center gap-3 category-bg">
					<h3 className="heading-3 !text-white">Categories</h3>
					<LocalSearch
						route={'/shop/category'}
						iconPosition={'left'}
						placeholder={'Search by name'}
						containerClass={
							'bg-white border border-primary-gray border-opacity-15 col-span-3 sm:w-[350px] w-full'
						}
						inputClass={'h-[50px]'}
						iconClass={''}
					/>
				</div>

				{result && result.categories.length > 0 ? (
					<div className="space-y-10">
						<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xm:gap-5 gap-3">
							{result.categories.map((item, index) => (
								<CategoryCard key={index} item={item} />
							))}
						</div>
						<div className="flex justify-center">
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
						title={'No category found to show'}
						description={`Oops! Currently, there are no category to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
						Links={
							<a
								href="/admin/store/category"
								className="btn-navlink btn-navlink-active !w-auto"
							>
								Reload
							</a>
						}
					/>
				)}
			</div>
		</div>
	);
};

export default ProductCategories;
