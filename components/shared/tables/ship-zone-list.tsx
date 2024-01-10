'use client';
import { FC, useState } from 'react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/lib/helpers/formater';
import { Button } from '@/components/ui/button';
import { PenSquare, Trash2 } from 'lucide-react';
import Pagination from '../filters/pagination';
type ClassProps = {
	data: ShipZoneList[];
	pages: number;
};
const ShipZoneList: FC<ClassProps> = ({ data, pages }) => {
	const [isPending, setIsPending] = useState(false);
	const handleDeleteClass = async (ids: string[]) => {};
	return (
		<div className="ship-class-table dashboard-col-space">
			<Table>
				<TableHeader className="[&_tr]:border-b-0">
					<TableRow className="border-b-0">
						<TableHead className="p-0">
							<div className="table-head-start">
								<span>Class name</span>
							</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data">Description</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-data">Created AT</div>
						</TableHead>
						<TableHead className="p-0">
							<div className="table-head-end">Action</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-t-0">
					{data.map((item, index) => (
						<Collapsible key={index} asChild>
							<>
								<TableRow className="border-b-0 border-t-0">
									<TableCell className="p-0">
										<div className="table-cell-start min-h-[80px]">
											<span className="text-base-2">
												{item.name}
											</span>
										</div>
									</TableCell>
									<TableCell className="p-0">
										<div className="table-cell-data min-h-[80px]">
											--
										</div>
									</TableCell>
									<TableCell className="p-0">
										<div className="table-cell-data min-h-[80px]">
											{dateFormat(item.createdAt)}
										</div>
									</TableCell>
									<TableCell className="p-0">
										<div className="table-cell-end min-h-[80px] gap-[10px]">
											<CollapsibleTrigger asChild>
												<Button className="badge-success">
													<PenSquare size={16} />
												</Button>
											</CollapsibleTrigger>
											<Button
												className="badge-danger"
												onClick={() =>
													handleDeleteClass([item.id])
												}
												disabled={isPending}
											>
												<Trash2 size={16} />
											</Button>
										</div>
									</TableCell>
								</TableRow>
								<CollapsibleContent
									asChild
									className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
								>
									<>
										<TableRow className="border-b-0 border-t-0">
											<TableCell
												colSpan={4}
												className="p-0"
											>
												<div className="table-cell-data rounded-md table-cell-data-start table-cell-data-end w-full">
													Zone Details
												</div>
											</TableCell>
										</TableRow>
									</>
								</CollapsibleContent>
							</>
						</Collapsible>
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

export default ShipZoneList;
