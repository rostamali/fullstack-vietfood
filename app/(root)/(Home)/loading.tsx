import CategorySliderScreen from '@/components/loading/category-slider-screen';
import ProductSliderScreen from '@/components/loading/product-slider-screen';
import { Skeleton } from '@/components/ui/skeleton';

const HomeLoading = () => {
	return (
		<div>
			<div className="hero-banner py-[60px]">
				<div className="container space-y-[60px]">
					{/* Hero Banner */}
					<div className="flex flex-col lg:flex-row gap-6">
						<div className="h-[420px] lg:w-[70%] w-full rounded-md bg-white p-4 flex flex-col justify-center gap-3">
							<Skeleton className="h-[40px] lg:w-[50%] w-full rounded-md bg-[#F6F6F6]" />
							<div className="space-y-2">
								<Skeleton className="h-[20px] lg:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[20px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[18px] lg:w-[65%] w-full rounded-md bg-[#F6F6F6]" />
							</div>
							<Skeleton className="h-[45px] w-[140px] rounded-md bg-[#F6F6F6]" />
						</div>

						<div className="lg:w-[350px] w-full">
							<div className="grid lg:grid-cols-1 xm:grid-cols-2 gap-5">
								<div className="w-full h-[200px] rounded-md bg-white p-4 flex flex-col justify-center gap-3">
									<Skeleton className="h-[40px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
									<div className="space-y-2">
										<Skeleton className="h-[20px] lg:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
										<Skeleton className="h-[20px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
									</div>
								</div>
								<div className="w-full h-[200px] rounded-md bg-white p-4 flex flex-col justify-center gap-3">
									<Skeleton className="h-[40px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
									<div className="space-y-2">
										<Skeleton className="h-[20px] lg:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
										<Skeleton className="h-[20px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* New Arrival */}
					<ProductSliderScreen />

					{/* Categories */}
					<CategorySliderScreen />

					{/* Best Selling */}
					<ProductSliderScreen />

					{/* Feature */}
					<div className="grid lg:grid-cols-4 xm:grid-cols-2 grid-cols-1 gap-5">
						{[1, 2, 3, 4].map((item, index) => (
							<div
								className="bg-white px-4 py-5 flex-center flex-col rounded-md space-y-2 text-center"
								key={index}
							>
								<Skeleton className="w-[55px] h-[55px] rounded-full bg-[#F6F6F6]" />
								<Skeleton className="w-[60%] h-[20px] rounded-md bg-[#F6F6F6]" />
								<Skeleton className="w-full h-[35px] rounded-md bg-[#F6F6F6]" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeLoading;
