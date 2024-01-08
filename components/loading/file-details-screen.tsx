import { Skeleton } from '@/components/ui/skeleton';

const FileDetailScreen = () => {
	return (
		<div className="file-update-loader">
			<div className="dialog-header">
				<Skeleton className="h-[24px] w-[100px] rounded-md bg-gray-muted" />
				<Skeleton className="h-[29px] w-[250px] rounded-md bg-gray-muted mt-[5px]" />
			</div>
			<div className="grid md:grid-cols-2 grid-cols-1 gap-[25px] items-center my-[30px]">
				{/* Left side with image */}
				<div className="flex flex-col gap-[10px]">
					<Skeleton className="h-[220px] w-full object-cover rounded-md bg-gray-muted" />
				</div>
				{/* Right side with file information */}
				<div className="file-info-wrap">
					<div className="grid grid-cols-2 gap-[20px]">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="file-info">
								<Skeleton className="w-full h-[24px] bg-gray-muted" />
								<Skeleton className="w-[80px] h-[24px] bg-gray-muted" />
							</div>
						))}
					</div>
					<div className="mt-[20px]">
						<Skeleton className="w-[60px] h-[24px] bg-gray-muted" />
						<div className="flex items-center gap-[5px] mt-[5px]">
							<Skeleton className="p-0 h-[28px] bg-gray-muted w-[60px]" />
							<Skeleton className="p-0 h-[28px] bg-gray-muted w-[70px]" />
						</div>
					</div>
				</div>
			</div>
			<div className="dialog-form form-flex-space">
				<div className="grid grid-cols-2 gap-[25px]">
					{[1, 2].map((item) => (
						<div key={item}>
							<Skeleton className="h-[20px] w-[80px] rounded-md bg-gray-muted" />
							<Skeleton className="h-[45px] w-full rounded-md bg-gray-muted mt-2" />
						</div>
					))}
				</div>
				<div className="flex justify-between max-xm:justify-end">
					<div className="file-info max-xm:hidden">
						<div className="flex items-center gap-[5px]">
							<Skeleton className="h-[45px] w-[45px] rounded-full bg-gray-muted" />
							<div className="flex flex-col gap-[4px]">
								<Skeleton className="h-[20px] w-[120px] rounded-md bg-gray-muted" />
								<Skeleton className="h-[20px] w-[120px] rounded-md bg-gray-muted" />
							</div>
						</div>
					</div>
					<Skeleton className="h-[45px] w-[127px] rounded-md bg-gray-muted" />
				</div>
			</div>
		</div>
	);
};

export default FileDetailScreen;
