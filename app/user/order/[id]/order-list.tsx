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

const OrderList: React.FC<TableProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-md">
			<Table>
				<TableHeader className="[&_tr]:border-b-0">
					<TableRow className="border-b-0">
						<TableHead className="p-0">
							<div className="table-head-start !bg-white !border-transparent">
								Product
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Price
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Quantity
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-end !bg-white !border-transparent">
								Total
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-t-0">
					{data.map((item, index) => (
						<TableRow className="border-b-0 border-t-0" key={index}>
							<TableCell className="p-0">
								<div className="table-cell-start !mt-0 border-transparent">
									<div className="flex items-center gap-1.5">
										<div
											className={`h-[55px] w-[55px] border-light flex-center rounded-md ${
												item.thumbnail
													? 'bg-transparent'
													: 'bg-primary-gray bg-opacity-30'
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
								<div className="table-cell-data !mt-0 border-transparent">
									${item.unitPrice.toFixed(2)}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									{item.quantity}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-end !mt-0 border-transparent">
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

export default OrderList;
