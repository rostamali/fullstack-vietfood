import { Skeleton } from '@/components/ui/skeleton';
import { ShieldQuestion } from 'lucide-react';

const EmptyIcon = () => {
	return (
		<div className="w-[384px] h-[268px] max-xm:w-full relative flex-center">
			<div className="bg-[#F4F6F8] h-full w-[70%] max-xm:w-[80%] rounded-lg border-4 border-white"></div>
			<div className="empty-bubble top-4 left-4 max-xm:-left-2 max-xm:top-5">
				<div className="flex items-center gap-[18px] h-full">
					<div className="empty-bubble__icon">
						<ShieldQuestion size={22} />
					</div>
					<div className="flex flex-col gap-[12px]">
						<Skeleton className="h-[12px] w-[60px] rounded-md bg-gray-muted" />
						<Skeleton className="h-[12px] w-[95px] rounded-md bg-gray-muted" />
					</div>
				</div>
			</div>
			<div className="empty-bubble top-[50%] right-4 max-xm:-right-2 translate-y-[-50%]">
				<div className="flex items-center gap-[18px] h-full">
					<div className="empty-bubble__icon">
						<ShieldQuestion size={22} />
					</div>
					<div className="flex flex-col gap-[12px]">
						<Skeleton className="h-[12px] w-[60px] rounded-md bg-gray-muted" />
						<Skeleton className="h-[12px] w-[95px] rounded-md bg-gray-muted" />
					</div>
				</div>
			</div>
			<div className="empty-bubble bottom-4 left-4 max-xm:-left-2 max-xm:bottom-5">
				<div className="flex items-center gap-[18px] h-full">
					<div className="empty-bubble__icon">
						<ShieldQuestion size={22} />
					</div>
					<div className="flex flex-col gap-[12px]">
						<Skeleton className="h-[12px] w-[60px] rounded-md bg-gray-muted" />
						<Skeleton className="h-[12px] w-[95px] rounded-md bg-gray-muted" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyIcon;
