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
import { dateFormat } from '@/lib/helpers/formater';
import Pagination from '../../../../../components/elements/filters/pagination';
import EmptyError from '../../../../../components/elements/shared/empty-error';
import Link from 'next/link';
import ActionMenu from '../../../../../components/elements/shared/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import UpdateClass from '../../../../../components/elements/modals/update-class';
import { useDeleteShipClass } from '@/lib/hooks/useShip';
type ClassProps = {
	data: ShipClassList[];
	pages: number;
};
export interface ClassDetails {
	id: string;
	name: string;
	description: string;
}

const ShipClassList: FC<ClassProps> = ({ data, pages }) => {
	const { mutate: deleteClass, isPending } = useDeleteShipClass();
	const [details, setDetails] = useState<ClassDetails | null>(null);
	const handleDeleteClass = async (ids: string[]) => {
		deleteClass(ids);
	};

	return (
		<div className="ship-class-table dashboard-col-space">
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<span>Class name</span>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Description
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Created AT
								</div>
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
										<span className="text-base-2">
											{item.name}
										</span>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.description
											? item.description
											: '--'}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{dateFormat(item.createdAt)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px] gap-[10px]">
										<ActionMenu
											content={
												<>
													<MenubarItem
														className="menubar-item cursor-pointer"
														onClick={() => {
															setDetails({
																id: item.id,
																name: item.name,
																description:
																	item.description
																		? item.description
																		: '',
															});
														}}
													>
														Edit Class
													</MenubarItem>
													<MenubarItem
														className="menubar-item"
														disabled={isPending}
														onClick={() =>
															handleDeleteClass([
																item.id,
															])
														}
													>
														Delete Class
													</MenubarItem>
												</>
											}
										/>
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
					title={'No class found to show'}
					description={`Oops! It seems there are no shipping class available to display at the moment. 🚛 Feel free to add new zone to enhance this space 🌟`}
					Links={
						<Link
							href="/admin/store/shipping/class"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Reload
						</Link>
					}
				/>
			)}
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
			<UpdateClass defaultValues={details} setClose={setDetails} />
		</div>
	);
};

export default ShipClassList;
