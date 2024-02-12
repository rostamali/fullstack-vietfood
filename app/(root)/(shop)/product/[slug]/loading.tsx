import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsLoading = () => {
	return (
		<div className="product-info-wrapper space-y-16 py-[60px]">
			<div className="container product-info">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
					<div className="">
						<Skeleton className="h-[435px] w-full rounded-md bg-white" />
					</div>
					<div className="flex flex-col gap-5 items-start">
						<Skeleton className="h-[45px] sm:w-[70%] w-full rounded-md bg-white" />
						<div className="flex flex-col gap-4">
							<Skeleton className="h-[33px] w-[150px] rounded-md bg-white" />
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1">
									{[1, 2, 3, 4, 5].map((item, index) => (
										<Skeleton
											className="h-[17px] w-[17px] rounded-md bg-white"
											key={index}
										/>
									))}
								</div>
								<Skeleton className="h-[20px] w-[70px] rounded-md bg-white" />
							</div>
							<div className="flex items-center gap-1.5 text-base-2">
								<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
								<Skeleton className="h-[21px] w-[60px] rounded-md bg-white" />
							</div>
						</div>
						<div className="space-y-4 w-full">
							<div className="flex items-center gap-4">
								<Skeleton className="h-[45px] w-[150px] rounded-md bg-white" />
								<Skeleton className="h-[45px] w-[52px] rounded-md bg-white" />
							</div>
							<Skeleton className="h-[45px] w-[218px] rounded-md bg-white" />
						</div>
						{/* <AddToCart productId={result?.id} /> */}
						<div className="flex items-center gap-1.5 text-base-2">
							<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
							<Skeleton className="h-[21px] w-[120px] rounded-md bg-white" />
						</div>
						<div className="flex items-center gap-1.5 text-base-2">
							<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
							<Skeleton className="h-[21px] w-[60px] rounded-md bg-white" />
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
							<div className="flex items-center gap-1.5">
								<Skeleton className="h-[21px] w-[60px] rounded-md bg-white" />
								<Skeleton className="h-[21px] w-[60px] rounded-md bg-white" />
								<Skeleton className="h-[21px] w-[60px] rounded-md bg-white" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container product-content space-y-6">
				<div className="space-y-3">
					<Skeleton className="h-[34px] w-full rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[70%] rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[80%] rounded-md bg-white" />
					<Skeleton className="h-[34px] w-[60%] rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[85%] rounded-md bg-white" />
					<Skeleton className="h-[34px] w-[90%] rounded-md bg-white" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-[34px] w-[60%] rounded-md bg-white" />
					<Skeleton className="h-[34px] w-full rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[80%] rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[70%] rounded-md bg-white" />
					<Skeleton className="h-[30px] w-[85%] rounded-md bg-white" />
					<Skeleton className="h-[34px] w-[90%] rounded-md bg-white" />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsLoading;
