'use client';
import { FC } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
type TooltipProps = {
	children: React.ReactNode;
	content: string;
};

const SmallTooltip: FC<TooltipProps> = ({ children, content }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent className="bg-primary-green shadow-none">
					<p className="text-base-2 !text-white">{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SmallTooltip;
