import { Skeleton } from '@/components/ui/skeleton';

const OrderLoading = () => {
	return (
		<div className="dashboard-col-space">
			<Skeleton className="h-[45px] w-[125px] rounded bg-white" />
			<div className="grid grid-cols-[210px,1fr] max-sm:grid-cols-1 gap-5 max-sm:gap-2">
				<Skeleton className="h-[50px] w-full rounded bg-white" />
				<Skeleton className="h-[50px] w-full rounded bg-white" />
			</div>
			<div className="bg-white p-4 space-y-8 rounded-md">
				{[1, 2, 3, 4, 5].map((item, index) => (
					<div className="grid grid-cols-8 gap-3" key={index}>
						<div className="col-span-2">
							<Skeleton className="h-[30px] w-full rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-full rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-[70%] rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-[90%] rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-full rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-[80%] rounded bg-[#F6F6F6]" />
						</div>
						<div>
							<Skeleton className="h-[30px] w-full rounded bg-[#F6F6F6]" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderLoading;
