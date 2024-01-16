import { Skeleton } from '@/components/ui/skeleton';

const ShipZoneLoading = () => {
	return (
		<div className="dashboard-col-space">
			{/* Header */}
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[50px] w-[150px] rounded-md bg-white" />
				<Skeleton className="h-[50px] w-[80px] rounded-md bg-white" />
			</div>
			{/* Table */}
			<div>
				<Skeleton className="h-[48px] w-full rounded-md bg-white" />
				<div className="mt-[15px] flex flex-col gap-[10px]">
					{[1, 2, 3, 4, 5].map((item) => (
						<Skeleton
							className="h-[80px] w-full rounded-md bg-white"
							key={item}
						/>
					))}
				</div>
			</div>
			{/* Table Footer */}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<Skeleton className="h-[40px] w-[135px] rounded-md bg-white" />
				<Skeleton className="h-[40px] w-[240px] rounded-md bg-white" />
			</div>
		</div>
	);
};

export default ShipZoneLoading;
