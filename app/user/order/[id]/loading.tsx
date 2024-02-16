import { Skeleton } from '@/components/ui/skeleton';

const OrderDetailsLoading = () => {
	return (
		<div className="dashboard-col-space">
			<Skeleton className="h-[45px] w-[125px] rounded bg-white" />
			<div className="space-y-6">
				<div className="flex items-center justify-between gap-3">
					<Skeleton className="h-[30px] w-[140px] rounded bg-white" />
					<Skeleton className="h-[45px] w-[122px] rounded bg-white" />
				</div>

				<div className="bg-white p-5 rounded-md space-y-4">
					<div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
						{[1, 2, 3, 4].map((item, index) => (
							<Skeleton
								className="h-[108px] w-full rounded bg-[#F6F6F6]"
								key={index}
							/>
						))}
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					{[1, 2].map((item, index) => (
						<div
							className="bg-white p-4 rounded-md space-y-4"
							key={index}
						>
							<div className="flex items-center gap-3">
								<Skeleton className="h-[45px] w-[45px] rounded bg-[#F6F6F6]" />
								<Skeleton className="h-[27px] w-[90px] rounded bg-[#F6F6F6]" />
							</div>
							<div className="space-y-1.5">
								<Skeleton className="h-[22.5px] w-[40%] rounded bg-[#F6F6F6]" />
								<Skeleton className="h-[22.5px] w-[30%] rounded bg-[#F6F6F6]" />
								<Skeleton className="h-[22.5px] w-[60%] rounded bg-[#F6F6F6]" />
							</div>
						</div>
					))}
				</div>
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

export default OrderDetailsLoading;
