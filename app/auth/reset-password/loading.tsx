import { Skeleton } from '@/components/ui/skeleton';

const ResetLoading = () => {
	return (
		<div className="auth dashboard-col-space">
			<div className="flex-center">
				<Skeleton className="h-[27px] w-[80%] rounded-md bg-[#F6F6F6]" />
			</div>
			<div className="flex flex-col gap-[20px]">
				<div className="form-flex-space">
					<div className="space-y-2">
						<Skeleton className="h-[20px] w-[120px] rounded-md bg-[#F6F6F6]" />
						<Skeleton className="h-[45px] w-full rounded-md bg-[#F6F6F6]" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-[20px] w-[120px] rounded-md bg-[#F6F6F6]" />
						<Skeleton className="h-[45px] w-full rounded-md bg-[#F6F6F6]" />
					</div>
					<Skeleton className="h-[45px] w-full rounded-md bg-[#F6F6F6]" />
				</div>
				<div className="flex-center">
					<Skeleton className="h-[21px] w-[75%] rounded-md bg-[#F6F6F6]" />
				</div>
			</div>
		</div>
	);
};

export default ResetLoading;
