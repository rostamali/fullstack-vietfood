import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
type CardProps = {
	data: CheckoutItems;
};

const CheckoutItem: React.FC<CardProps> = ({ data }) => {
	return (
		<>
			<div className="bg-white border-b-2 border-b-gray-muted py-[18px] px-[20px]">
				<div className="grid sm:grid-cols-[80px,1fr,100px] grid-cols-[80px,1fr] gap-3.5 items-center">
					<div className="h-[80px] w-[80px] border-light rounded-md flex-center">
						<Image
							src={
								data?.thumbnail
									? `/uploads/files/${data.thumbnail}`
									: '/assets/placeholder.svg'
							}
							alt={data.name}
							width={400}
							height={400}
							className="w-[80%] object-contain bg-transparent"
							style={{
								aspectRatio: '3/2',
							}}
						/>
					</div>
					<div className="space-y-1.5">
						<h2 className="text-heading-6">{data.name}</h2>
						<div className="flex items-center gap-4 flex-wrap">
							<div className="flex items-center gap-1">
								<span className="text-base-1">Quantity: </span>
								<span className="text-base-1 !font-medium">
									{data.quantity}
								</span>
							</div>
							<Separator className="h-4 w-[1.5px] bg-gray-dark" />
							<div className="flex items-center gap-1">
								<span className="text-base-1">Price: </span>
								<span className="text-base-1 !font-medium">
									${data.unitPrice.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
					<div className="max-sm:col-span-2">
						<div className="flex items-center gap-1.5">
							<h4 className="sm:hidden heading-4">Total:</h4>
							<h4 className="heading-4">
								${data.totalCost.toFixed(2)}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckoutItem;
