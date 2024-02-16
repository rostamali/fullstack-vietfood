import { Skeleton } from '@/components/ui/skeleton';

const WishlistLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[45px] w-[125px] rounded bg-white" />
				<Skeleton className="h-[50px] w-[128px] rounded-md bg-white" />
			</div>
			<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-5 lg:gap-2 gap-5">
				{[1, 2, 3, 4, 5, 6].map((item, index) => (
					<div className="bg-white p-4 rounded space-y-2" key={index}>
						<Skeleton className="flex-center rounded h-[260px] bg-[#F6F6F6]" />
						<div>
							<Skeleton className="w-full h-[24px] rounded-md bg-[#F6F6F6]" />
							<Skeleton className="w-[120px] h-[20px] rounded-md bg-[#F6F6F6] mt-1" />
						</div>
						<div className="space-y-1">
							<Skeleton className="w-full h-[45px] rounded-md bg-[#F6F6F6]" />
							<Skeleton className="w-full h-[45px] rounded-md bg-[#F6F6F6]" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WishlistLoading;
