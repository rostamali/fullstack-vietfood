import { Skeleton } from '../ui/skeleton';
import ProductCardScreen from './product-card-screen';

const ProductSliderScreen = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between gap-4">
				<div className="space-y-2 w-full">
					<Skeleton className="sm:w-[240px] w-[60%] h-[45px] rounded-md bg-white" />
					<Skeleton className="sm:w-[260px] w-[75%] h-[22px] rounded-md bg-white" />
				</div>
				<div className="flex items-center gap-2 max-xm:flex-col">
					<Skeleton className="w-[35px] h-[35px] rounded-md bg-white" />
					<Skeleton className="w-[35px] h-[35px] rounded-md bg-white" />
				</div>
			</div>
			<div className="slider-wrapper">
				<div className="xl:block hidden">
					<div className="grid grid-cols-4 gap-5">
						{[1, 2, 3, 4].map((item, index) => (
							<ProductCardScreen key={index} />
						))}
					</div>
				</div>
				<div className="sm:hidden block">
					{[1].map((item, index) => (
						<ProductCardScreen key={index} />
					))}
				</div>
				<div className="lg:hidden sm:block hidden">
					<div className="grid grid-cols-2 gap-5">
						{[1, 2].map((item, index) => (
							<ProductCardScreen key={index} />
						))}
					</div>
				</div>
				<div className="xl:hidden lg:block hidden">
					<div className="grid grid-cols-3 gap-5">
						{[1, 2, 3].map((item, index) => (
							<ProductCardScreen key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSliderScreen;
