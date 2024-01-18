import { Skeleton } from '../ui/skeleton';

const AddressFormScreen = () => {
	return (
		<div className="form-flex-space">
			<Skeleton className="h-[23px] w-[250px] rounded-md bg-gray-muted pb-4" />
			<div>
				<Skeleton className="h-[23px] w-[120px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
			</div>
			<div className="grid grid-cols-2 gap-[25px]">
				<div>
					<Skeleton className="h-[23px] w-[120px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
				</div>
				<div>
					<Skeleton className="h-[23px] w-[120px] rounded-md bg-transparent" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
				</div>
				<div>
					<Skeleton className="h-[23px] w-[120px] rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
				</div>
				<div>
					<Skeleton className="h-[23px] w-[120px] rounded-md bg-transparent" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
				</div>
				<div className="col-span-2 grid grid-cols-3 gap-[15px]">
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted" />
					<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted" />
				</div>
			</div>
			<div className="flex items-center gap-[10px]">
				<Skeleton className="h-[20px] w-[20px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[20px] w-full rounded-md bg-gray-muted" />
			</div>
			<div className="flex justify-end">
				<Skeleton className="h-[45px] w-[140px] rounded-md bg-gray-muted" />
			</div>
		</div>
	);
};

export default AddressFormScreen;
