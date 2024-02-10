import ProductCardScreen from '@/components/loading/product-card-screen';
import { Skeleton } from '@/components/ui/skeleton';

const ShopLoading = () => {
	return (
		<div className="py-[60px]">
			<div className="container">
				<div className="space-y-10">
					{/* Filters */}
					<div className="grid xl:grid-cols-4 lg:gap-5 md:grid-cols-3 gap-5">
						<div className="bg-white md:order-1 order-2 rounded-md space-y-5 p-4">
							<div className="space-y-3">
								<Skeleton className="h-[20px] md:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[52px] w-full rounded-md bg-[#F6F6F6]" />
							</div>
							<div className="space-y-3">
								<Skeleton className="h-[20px] md:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
								{[1, 2, 3, 4, 5].map((item, index) => (
									<div
										className="flex items-center gap-2"
										key={index}
									>
										<Skeleton className="h-[20px] w-[20px] rounded bg-[#F6F6F6]" />
										<Skeleton className="h-[20px] w-[100px] rounded bg-[#F6F6F6]" />
									</div>
								))}
							</div>
						</div>
						<div className="xl:col-span-3 md:col-span-2 overflow-hidden ,d:order-2 order-1">
							<div className="h-[350px] w-full rounded-md bg-white p-4 flex flex-col justify-center gap-3">
								<Skeleton className="h-[40px] lg:w-[50%] w-full rounded-md bg-[#F6F6F6]" />
								<div className="space-y-2">
									<Skeleton className="h-[20px] lg:w-[70%] w-full rounded-md bg-[#F6F6F6]" />
									<Skeleton className="h-[20px] lg:w-[60%] w-full rounded-md bg-[#F6F6F6]" />
									<Skeleton className="h-[18px] lg:w-[65%] w-full rounded-md bg-[#F6F6F6]" />
								</div>
								<Skeleton className="h-[45px] w-[140px] rounded-md bg-[#F6F6F6]" />
							</div>
						</div>
					</div>

					{/* Products */}
					<div className="grid xl:grid-cols-4 lg:gap-5 lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-4">
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
							<ProductCardScreen key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopLoading;
