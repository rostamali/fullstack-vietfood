import { Skeleton } from '../ui/skeleton';

const UserFormScreen = () => {
	return (
		<div>
			<div>
				<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
			</div>
			<div className="form-flex-space mt-[10px]">
				<div className="grid grid-cols-2 gap-[25px]">
					{[1, 2, 3, 4].map((item) => (
						<div>
							<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
							<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
						</div>
					))}
				</div>
				<div>
					<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<div>
					<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<div className="flex items-center gap-[10px]">
					<Skeleton className="h-[20px] w-[20px] rounded bg-gray-muted" />
					<Skeleton className="h-[20px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
			</div>
		</div>
	);
};

export default UserFormScreen;
