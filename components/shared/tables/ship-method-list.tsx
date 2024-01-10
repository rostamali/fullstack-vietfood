'use client';
import { FC, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, PenSquare } from 'lucide-react';
import Pagination from '../filters/pagination';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
import { deleteMethodByAdmin } from '@/lib/actions/ship.action';
import { ShipMethodFormat, TaxStatusFormat } from '@/lib/helpers/formater';
import { Switch } from '@/components/ui/switch';
import Spinner from '../ui/spinner';
import MethodUpdate from '@/components/ecom/shipping/method-update';
type MethodProps = {
	data: ShipMethodList[];
	pages: number;
};
const ShipMethodList: FC<MethodProps> = ({ data, pages }) => {
	const [isPending, setIsPending] = useState(false);
	const handleDeleteMethod = async (id: string) => {
		setIsPending(true);
		try {
			const result = await deleteMethodByAdmin({
				id,
			});
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError
					toastNumber={t}
					content={`Method delete action failed`}
				/>
			));
		}
	};
	return (
		<div className="ship-class-table dashboard-col-space">
			<Table>
				<TableHeader className="[&_tr]:border-b-0">
					<TableRow className="border-b-0">
						<TableHead className="p-0">
							<div className="table-head-start">
								<span>Method name</span>
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data">Type</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data">Enabled</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data">Tax Status</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-end">Action</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-t-0">
					{data.map((item, index) => (
						<TableRow className="border-b-0 border-t-0" key={index}>
							<TableCell className="p-0">
								<div className="table-cell-start min-h-[60px]">
									<span className="text-base-2">
										{item.name}
									</span>
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data min-h-[60px]">
									{ShipMethodFormat[item.type]}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data min-h-[60px]">
									<Switch
										className="bg-gray-muted text-white data-[state=checked]:bg-black-dark"
										checked={item.active}
									/>
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-data min-h-[60px]">
									{TaxStatusFormat[item.taxStatus]}
								</div>
							</TableCell>
							<TableCell className="p-0">
								<div className="table-cell-end min-h-[60px] gap-[10px]">
									<MethodUpdate
										data={{
											type: item.type,
											id: item.id,
										}}
									/>
									<Button
										className="badge-danger h-[30px]"
										onClick={() =>
											handleDeleteMethod(item.id)
										}
										disabled={isPending}
									>
										{isPending ? (
											<Spinner
												className={
													'h-[16px] w-[16px] stroke-action-danger'
												}
											/>
										) : (
											<Trash2 size={16} />
										)}
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1">0 row(s) selected.</div>
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
	);
};

export default ShipMethodList;
