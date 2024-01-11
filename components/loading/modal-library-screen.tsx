import { Skeleton } from '../ui/skeleton';

const ModalLibraryScreen = () => {
	return (
		<div>
			<div>
				<Skeleton className="h-[36px] w-[150px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[20px] w-full rounded-md bg-gray-muted mt-[10px]" />
			</div>
			<div className="max">
				<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[25px] my-[25px]">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
						<Skeleton
							className="h-[180px] w-full rounded-md bg-gray-muted"
							key={item}
						/>
					))}
				</div>
			</div>
			<div className="flex items-center justify-between gap-[15px]">
				<Skeleton className="h-[22px] w-[150px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[45px] w-[75px] rounded-md bg-gray-muted" />
			</div>
		</div>
	);
};

export default ModalLibraryScreen;
