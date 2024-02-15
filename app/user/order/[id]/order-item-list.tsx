import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
type TableProps = {
	data: {
		quantity: number;
		name: string;
		thumbnail: string | null;
		category: string;
		unitPrice: number;
		totalCost: number;
	}[];
};

const OrderItemList: React.FC<TableProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-md overflow-hidden pb-2.5">
			<Table>
				<TableHeader className="[&_tr]:border-b-0">
					<TableRow className="border-b-0">
						<TableHead className="p-0">
							<div className="order-t-head-data">Product</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="order-t-head-data">Price</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="order-t-head-data">Quantity</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="order-t-head-data">Total</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-t-0">
					{data.map((item, index) => (
						<TableRow className="border-b-0 border-t-0" key={index}>
							<TableCell className="p-0">
								<div className="order-t-cell-data">
									<div className="flex items-center gap-1.5">
										<div
											className={`h-[55px] w-[55px] border-light flex-center rounded-md ${
												item.thumbnail
													? 'bg-transparent'
													: 'bg-[#D7DBE0] bg-opacity-30'
											}`}
										>
											<Image
												src={
													item.thumbnail
														? `/uploads/files/${item.thumbnail}`
														: '/assets/placeholder.svg'
												}
												alt={item.name}
												width={100}
												height={100}
												className={`w-[70%] object-contain`}
											/>
										</div>
										<div className="flex-1 flex flex-col gap-[5px]">
											<span className="text-base-1">
												{item.name}
											</span>
											<span className="text-base-2">
												{item.category}
											</span>
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="order-t-cell-data">
									${item.unitPrice.toFixed(2)}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="order-t-cell-data">
									{item.quantity}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="order-t-cell-data">
									${item.totalCost.toFixed(2)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default OrderItemList;
