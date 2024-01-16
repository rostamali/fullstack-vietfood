import { Skeleton } from '@/components/ui/skeleton';

const ProfileLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex md:items-end justify-between max-md:flex-col gap-[15px]">
				<div className="flex xm:items-center gap-[15px] max-xm:flex-col">
					<Skeleton className="h-[120px] w-[120px] rounded-full bg-white" />
					<div className="flex flex-col gap-2">
						<div>
							<Skeleton className="h-[40px] w-[270px] rounded-full bg-white" />
							<Skeleton className="h-[20px] w-[220px] rounded-full bg-white mt-[5px]" />
						</div>
						<Skeleton className="h-[25px] w-[270px] rounded-full bg-white mt-[5px]" />
					</div>
				</div>

				<div className="flex xm:justify-end">
					<Skeleton className="h-[50px] w-[220px] rounded-md bg-white" />
				</div>
			</div>
			<div className="form-flex-space">
				<div className="grid sm:grid-cols-2 gap-[25px]">
					{[1, 2, 3, 4].map((item) => (
						<div key={item}>
							<Skeleton className="h-[21px] w-[70px] rounded-md bg-white" />
							<Skeleton className="h-[50px] w-full rounded-md bg-white mt-[6px]" />
						</div>
					))}
				</div>
				<div>
					<Skeleton className="h-[21px] w-[40px] rounded-md bg-white" />
					<Skeleton className="h-[150px] w-full rounded-md bg-white my-[6px]" />
					<Skeleton className="h-[15px] w-[120px] rounded-md bg-white" />
				</div>
				<div className="flex justify-end">
					<Skeleton className="h-[50px] w-[80px] rounded-md bg-white" />
				</div>
			</div>
		</div>
	);
};

export default ProfileLoading;
