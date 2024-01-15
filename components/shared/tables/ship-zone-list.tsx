'use client';
import { FC } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Pagination from '../filters/pagination';
import Link from 'next/link';
import ActionMenu from '../ui/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import { Badge } from '@/components/ui/badge';
import { useDeleteShipZone } from '@/lib/hooks/useShip';
import EmptyError from '../ui/empty-error';
type ClassProps = {
	data: ShipZoneList[];
	pages: number;
};
const ShipZoneList: FC<ClassProps> = ({ data, pages }) => {
	const { mutate: deleteZone, isPending } = useDeleteShipZone();

	return (
		<div className="ship-class-table dashboard-col-space">
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									Zone name
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Region(s)</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Shipping method(s)
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
										<div className="flex flex-wrap gap-1">
											{item.regions.length > 0 ? (
												item.regions
													.slice(0, 3)
													.map((location, lIndex) => (
														<Badge
															key={lIndex}
															variant={'outline'}
														>
															{location.name}
														</Badge>
													))
											) : (
												<Badge variant={'outline'}>
													Everywhere
												</Badge>
											)}
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<div className="flex flex-wrap gap-1">
											{item.methods.length > 0 ? (
												item.methods.map(
													(method, mIndex) => (
														<Badge
															key={mIndex}
															variant={'outline'}
														>
															{method.name}
														</Badge>
													),
												)
											) : (
												<Badge variant={'outline'}>
													No shipping methods
												</Badge>
											)}
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px] gap-[10px]">
										<ActionMenu
											content={
												<>
													<Link
														href={`/admin/store/shipping/update?zone_id=${item.id}`}
													>
														<MenubarItem className="menubar-item cursor-pointer">
															Edit Zone
														</MenubarItem>
													</Link>
													<MenubarItem
														className="menubar-item"
														disabled={isPending}
														onClick={() => {
															deleteZone({
																id: item.id,
															});
														}}
													>
														Delete Zone
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
					title={'No zone found to show'}
					description={`Oops! It seems there are no zone available to display at the moment. 🚛 Feel free to add new zone to enhance this space 🌟`}
					Links={
						<Link
							href="/admin/store/shipping/create"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Create Zone
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
		</div>
	);
};

export default ShipZoneList;
