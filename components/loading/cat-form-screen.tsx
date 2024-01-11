import { Skeleton } from '../ui/skeleton';

const CatFormScreen = () => {
	return (
		<div>
			<div>
				<Skeleton className="h-[20px] w-[120px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
			</div>
			<div className="form-flex-space mt-[10px]">
				<Skeleton className="h-[100px] w-[100px] rounded-md bg-gray-muted" />
				<div>
					<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<div>
					<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<div>
					<Skeleton className="h-[20px] w-[100px] rounded bg-gray-muted" />
					<Skeleton className="h-[80px] w-full rounded-md bg-gray-muted mt-[10px]" />
				</div>
				<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-[10px]" />
			</div>
		</div>
	);
};

export default CatFormScreen;
