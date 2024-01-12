import { Skeleton } from '../ui/skeleton';

const ProductFormScreen = () => {
	return (
		<div className="form-flex-space">
			{/* Title */}
			<div className="flex sm:items-center justify-between max-sm:flex-col gap-[40px]">
				<Skeleton className="h-[45px] max-w-[230px] rounded-md bg-white" />
				<Skeleton className="h-[45px] max-w-[140px] rounded-md bg-white" />
			</div>
			{/* Form */}
			<div className="grid lg:grid-cols-[1fr,300px] gap-[25px]">
				<div className="form-info form-flex-space">
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					</div>
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[80px] w-full rounded-md bg-white mt-2" />
						<Skeleton className="h-[17px] w-[150px] rounded-md bg-white mt-1" />
					</div>
					<div>
						<Skeleton className="h-[40px] max-w-[450px] rounded-md bg-white" />
						<div className="mt-[40px]">
							<div className="grid sm:grid-cols-2 gap-[25px]">
								{[1, 2, 3, 4].map((item) => (
									<div key={item}>
										<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
										<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="form-flex-space">
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					</div>
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					</div>
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					</div>
					<div>
						<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
						<Skeleton className="h-[240px] w-full rounded-md bg-white mt-2" />
						<Skeleton className="h-[17px] w-[140px] rounded-md bg-white mt-1" />
					</div>
				</div>
			</div>
			<div>
				<Skeleton className="h-[21px] w-[80px] rounded-md bg-white" />
				<Skeleton className="h-[364px] w-full rounded-md bg-white mt-2" />
			</div>
		</div>
	);
};

export default ProductFormScreen;
