import { Skeleton } from '../ui/skeleton';

const CategoryCardScreen = () => {
	return (
		<div className="product-card overflow-hidden group bg-white p-4 rounded">
			<Skeleton className="flex-center rounded h-[140px] bg-[#F6F6F6]" />
			<div className="mt-3">
				<Skeleton className="w-full h-[24px] rounded-md bg-[#F6F6F6]" />
			</div>
		</div>
	);
};

export default CategoryCardScreen;
