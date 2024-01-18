import { Skeleton } from '@/components/ui/skeleton';

const AddressLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[45px] w-[125px] rounded bg-white" />
				<Skeleton className="h-[50px] w-[128px] rounded-md bg-white" />
			</div>
			<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
				{[1, 2, 3].map((item) => (
					<div key={item}>
						<Skeleton className="h-[180px] w-full rounded bg-white" />
					</div>
				))}
			</div>
		</div>
	);
};

export default AddressLoading;
