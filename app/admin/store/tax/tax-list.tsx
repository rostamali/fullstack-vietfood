'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UserStatus } from '@/constants';
import SelectFilter from '../../../../components/elements/filters/select-filter';
import { Button } from '@/components/ui/button';
import LocalSearch from '../../../../components/elements/filters/local-search';
import SmallTooltip from '../../../../components/elements/shared/small-tooltip';
import { Download } from 'lucide-react';
import Pagination from '../../../../components/elements/filters/pagination';
import { FC, useState } from 'react';
import EmptyError from '../../../../components/elements/shared/empty-error';
import ActionMenu from '../../../../components/elements/shared/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import UpdateTaxModal from '@/app/admin/store/tax/update-tax-modal';
import { useDeleteTax } from '@/lib/hooks/useTax';
type TaxListProps = {
	data: TaxList[];
	pages: number;
};

const TaxList: FC<TaxListProps> = ({ data, pages }) => {
	const [selectId, setSelectId] = useState<string | null>(null);
	const { mutate: deleteTax, isPending: isDelete } = useDeleteTax();

	return (
		<div className="user-table dashboard-col-space">
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<span>Rate name</span>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Country</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">State</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Rate</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Priority</div>
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
									<div className="table-cell-start min-h-[80px] min-w-[200px]">
										<span className="text-base-2">
											{item.name}
										</span>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.country}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.state}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.taxRate}%
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.priority}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px]">
										<ActionMenu
											content={
												<>
													<MenubarItem
														className="menubar-item"
														onClick={() =>
															setSelectId(item.id)
														}
													>
														Update Rate
													</MenubarItem>
													<MenubarItem
														disabled={isDelete}
														className="menubar-item"
														onClick={() => {
															deleteTax({
																id: item.id,
															});
														}}
													>
														Delete Rate
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
					title={'No tax rates available'}
					description={`Oops! It appears that there are no tax rates currently available for display. 🏷️ This section is ready for your input and customization 🌟`}
					Links={
						<a
							href="/admin/store/tax"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Reload
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
			{selectId && (
				<UpdateTaxModal id={selectId} onChange={setSelectId} />
			)}
		</div>
	);
};

export default TaxList;
