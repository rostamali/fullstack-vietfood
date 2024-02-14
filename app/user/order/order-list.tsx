import ActionMenu from '@/components/elements/shared/action-menu';
import { Button } from '@/components/ui/button';
import { MenubarItem } from '@/components/ui/menubar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	OrderStatusFormat,
	PaymentStatusFormat,
	dateFormat,
} from '@/lib/helpers/formater';
import Link from 'next/link';
type TableProps = {
	data: UserOrderList[];
};

const OrderList: React.FC<TableProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-md">
			<Table>
				<TableHeader className="[&_tr]:border-b-0">
					<TableRow className="border-b-0">
						<TableHead className="p-0">
							<div className="table-head-start !bg-white !border-transparent">
								Orders
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Created
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Status
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Items
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Total
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data !bg-white !border-transparent">
								Payment
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-end !bg-white !border-transparent">
								Actions
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-t-0">
					{data.map((item, index) => (
						<TableRow className="border-b-0 border-t-0" key={index}>
							<TableCell className="p-0">
								<div className="table-cell-start !mt-0 border-transparent">
									#{item.orderId}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									{dateFormat(item.orderDate)}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									{OrderStatusFormat[item.orderStatus]}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									{item.orderItems}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									${item.total.toFixed(2)}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data !mt-0 border-transparent">
									{
										PaymentStatusFormat[
											item.paymentStatus as PaymentStatus
										]
									}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-end !mt-0 border-transparent">
									<ActionMenu
										content={
											<div className="space-y-1.5">
												{item.paymentLink && (
													<Link
														href={`/order/payment?orderId=${item.orderId}`}
														target="_blank"
														className="w-full block"
													>
														<Button className="bg-action-success h-[30px] text-[13px] text-white w-full">
															Pay
														</Button>
													</Link>
												)}

												<Link
													href={`/user/order/${item.orderId}`}
													className="w-full block"
												>
													<Button className="border border-action-success text-action-success hover:bg-action-success h-[30px] text-[13px] hover:text-white w-full">
														View
													</Button>
												</Link>
											</div>
										}
									/>
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
