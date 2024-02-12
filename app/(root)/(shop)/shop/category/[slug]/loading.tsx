import ProductCardScreen from '@/components/loading/product-card-screen';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryDetailsLoading = () => {
	return (
		<div className="categories py-[60px]">
			<div className="container space-y-16">
				<div className="h-[280px] rounded-md p-5 flex flex-col justify-center gap-3 bg-white">
					<Skeleton className="sm:w-[250px] w-[70%] h-[45px] rounded-md bg-[#F6F6F6]" />
					<Skeleton className="sm:w-[350px] w-full h-[52px] rounded-md bg-[#F6F6F6]" />
				</div>

				<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xm:gap-5 gap-3">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
						(item, index) => (
							<ProductCardScreen key={index} />
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryDetailsLoading;
