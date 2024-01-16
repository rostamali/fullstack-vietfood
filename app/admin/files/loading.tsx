import { Skeleton } from '@/components/ui/skeleton';

const FileLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[50px] w-[120px] rounded-md bg-white " />
				<Skeleton className="h-[50px] w-[120px] rounded-md bg-white " />
			</div>
			<div className="file-library dashboard-col-space">
				<div className="library-header">
					<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
						<div className="lg:col-span-2 flex items-center gap-[15px]">
							<Skeleton className="h-[50px] w-full rounded-md bg-white " />
							<Skeleton className="h-[50px] w-[75px] rounded-md bg-white " />
						</div>
						<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
							<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
								<div className="col-span-3">
									<Skeleton className="h-[50px] w-full rounded-md bg-white " />
								</div>
								<div className="col-span-2">
									<Skeleton className="h-[50px] w-full rounded-md bg-white " />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[25px]">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
					<Skeleton
						className="h-[220px] w-full rounded-md bg-white "
						key={item}
					/>
				))}
			</div>
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<Skeleton className="h-[50px] min-w-[250px] max-w-[280px] rounded-md bg-white" />
				<Skeleton className="h-[50px] min-w-[250px] max-w-[280px] rounded-md bg-white" />
			</div>
		</div>
	);
};

export default FileLoading;
