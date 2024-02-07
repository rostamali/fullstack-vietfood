import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
type CardProps = {
	data: {
		cartItemId: string;
		name: string;
		thumbnail: string | null;
		category: string;
		quantity: number;
		unitPrice: number;
		totalCost: number;
	};
};

const CheckoutItem: React.FC<CardProps> = ({ data }) => {
	return (
		<div className="flex items-center gap-2">
			<Image
				src={
					data?.thumbnail
						? `/uploads/files/${data.thumbnail}`
						: '/assets/placeholder.svg'
				}
				alt={data.name}
				width={400}
				height={400}
				className="h-[75px] w-[75px] border-light rounded-md object-contain bg-transparent"
			/>
			<div className="item-info space-y-1.5">
				<h2 className="text-heading-6">
					{data.name.substring(0, 20)}...
				</h2>
				<div className="grid grid-cols-2 gap-3">
					<div className="flex items-center gap-1">
						<span className="text-base-1">QTY:</span>
						<span className="text-base-1">
							<strong>{data.quantity}</strong>
						</span>
					</div>
					<div className="flex items-center gap-1">
						<span className="text-base-1">Price:</span>
						<span className="text-base-1">
							<strong>${data.totalCost.toFixed(2)}</strong>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutItem;
