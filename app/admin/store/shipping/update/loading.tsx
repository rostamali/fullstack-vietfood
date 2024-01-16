import { Skeleton } from '@/components/ui/skeleton';

const UpdateZoneLoading = () => {
	return (
		<div className="dashboard-col-space">
			{/* Header */}
			<div className="flex items-center justify-between gap-[40px]">
				<div>
					<Skeleton className="h-[45px] w-[220px] rounded-md bg-white" />
					<div className="flex items-center gap-4 mt-2">
						<Skeleton className="h-[20px] w-[100px] rounded-md bg-white" />
						<Skeleton className="h-[20px] w-[100px] rounded-md bg-white" />
					</div>
				</div>
			</div>
			{/* Form */}
			<div className="grid sm:grid-cols-2 grid-cols-1 gap-[25px]">
				<div>
					<Skeleton className="h-[21px] w-[150px] rounded-md bg-white" />
					<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					<Skeleton className="h-[15px] max-w-[220] rounded-md bg-white mt-[5px]" />
				</div>
				<div>
					<Skeleton className="h-[21px] w-[150px] rounded-md bg-white" />
					<Skeleton className="h-[45px] w-full rounded-md bg-white mt-2" />
					<Skeleton className="h-[15px] max-w-[220] rounded-md bg-white mt-[5px]" />
				</div>
				<div className="col-span-2">
					<Skeleton className="h-[21px] w-[150px] rounded-md bg-white" />
					<Skeleton className="h-[118px] w-full rounded-md bg-white mt-2" />
				</div>
			</div>
			{/* Button */}
			<div className="flex justify-end">
				<Skeleton className="h-[45px] w-[180px] rounded-md bg-white" />
			</div>
		</div>
	);
};

export default UpdateZoneLoading;
