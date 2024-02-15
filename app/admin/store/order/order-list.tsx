'use client';
import LocalSearch from '@/components/elements/filters/local-search';
import Pagination from '@/components/elements/filters/pagination';
import SelectFilter from '@/components/elements/filters/select-filter';
import EmptyError from '@/components/elements/shared/empty-error';
import SmallTooltip from '@/components/elements/shared/small-tooltip';
import { Button } from '@/components/ui/button';
import { ProductStatus } from '@/constants';
import { Download } from 'lucide-react';
import { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { OrderStatusFormat, dateFormat } from '@/lib/helpers/formater';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import PaymentStatus from './payment-status';
type OrderListProps = {
	data: AdminOrderList[];
	pages: number;
};

const OrderList: FC<OrderListProps> = ({ data, pages }) => {
	return (
		<div className="order-table dashboard-col-space">
			<div className="table-header">
				<div className="grid grid-cols-[210px,1fr] gap-5">
					<div>
						<SelectFilter
							filterKey={'status'}
							placeholder={'Filter by status'}
							triggerClass={'input-field-lg bg-white'}
							contentClass={'bg-white'}
							options={ProductStatus}
						/>
					</div>
					<div className="flex flex-1 gap-4">
						<LocalSearch
							route={'/admin/store/order'}
							iconPosition={'left'}
							placeholder={''}
							containerClass={
								'bg-white border border-primary-gray border-opacity-15 w-full'
							}
							inputClass={'h-[50px]'}
							iconClass={''}
						/>
						<SmallTooltip content={'Export Data'}>
							<Button className="btn-ghost-lg">
								<Download strokeWidth={1.5} size={20} />
							</Button>
						</SmallTooltip>
					</div>
				</div>
			</div>
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<span>Customers</span>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Order</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Total</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Items</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Date</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Payment</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-end">Action</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border-t-0">
						{data.map((item, index) => (
							<TableRow
								className="border-b-0 border-t-0"
								key={index}
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<div className="flex items-center gap-1.5">
											<Image
												src={
													item.avatar
														? `/uploads/avatar/${item.avatar}`
														: '/assets/placeholder.svg'
												}
												alt={item.name}
												width={100}
												height={100}
												className={`h-[50px] w-[50px] border-light rounded object-cover ${
													item.avatar
														? 'bg-transparent'
														: 'bg-primary-gray bg-opacity-30'
												}`}
											/>
											<div className="flex flex-col gap-[5px]">
												<span className="text-base-1">
													{item.name}
												</span>
												<span className="text-base-2">
													#{item.orderId}
												</span>
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{
											OrderStatusFormat[
												item.orderStatus as OrderStatus
											]
										}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										${item.total.toFixed(2)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.orderItems}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{dateFormat(item.orderCreated)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<PaymentStatus
											status={item.paymentStatus}
										/>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px]">
										<Link
											href={`/admin/store/order/${item.orderId}`}
										>
											<Button className="bg-action-success h-[30px] text-[13px] text-white">
												View
											</Button>
										</Link>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'No products available'}
					description={`Oops! It looks like there are no products available right now. 🛍️ Add new products to keep your catalog vibrant and exciting! 🌟`}
					Links={
						<a
							href="/admin/store/order"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Create Product
						</a>
					}
				/>
			)}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1">0 row(s) selected.</div>
				<div>
					<Pagination
						pages={pages}
						containerClass={''}
						prevBtnClass={''}
						nextBtnClass={''}
						paginateBtnClass={''}
						paginateActiveClass={
							'bg-black-dark bg-opacity-10 text-black-dark'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
