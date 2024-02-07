'use client';
import { FC } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
type TooltipProps = {
	trigger: React.ReactNode;
	content: string;
};

const SmallTooltip: FC<TooltipProps> = ({ trigger, content }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{trigger}</TooltipTrigger>
				<TooltipContent className="bg-primary-green shadow-none">
					<p className="text-base-2 !text-white">{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SmallTooltip;
