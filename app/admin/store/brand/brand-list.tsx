'use client';
import { useState, FC } from 'react';
import SelectFilter from '../../../../components/elements/filters/select-filter';
import { Button } from '@/components/ui/button';
import LocalSearch from '../../../../components/elements/filters/local-search';
import { UserStatus } from '@/constants';
import SmallTooltip from '../../../../components/elements/shared/small-tooltip';
import { Download } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/helpers/formater';
import ActionMenu from '../../../../components/elements/shared/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import EmptyError from '../../../../components/elements/shared/empty-error';
import Pagination from '../../../../components/elements/filters/pagination';
import Image from 'next/image';
import UpdateBrand from '../../../../components/elements/modals/update-brand';
import UploadCSV from '@/components/elements/modals/upload-csv';
type BrandProps = {
	data: BrandTable[];
	pages: number;
};

const BrandList: FC<BrandProps> = ({ data, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	return (
		<div className="brand-table dashboard-col-space">
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<SelectFilter
							filterKey={'status'}
							placeholder={'Filter by status'}
							triggerClass={'input-field-lg bg-white'}
							contentClass={'bg-white'}
							options={UserStatus}
						/>
						<Button className="btn-primary-lg">Apply</Button>
					</div>
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/product/category'}
								iconPosition={'left'}
								placeholder={''}
								containerClass={
									'bg-white border border-primary-gray border-opacity-15 col-span-3'
								}
								inputClass={'h-[50px]'}
								iconClass={''}
							/>
							<div className="col-span-2">
								<SelectFilter
									filterKey={'status'}
									placeholder={'Filter by status'}
									triggerClass={'input-field-lg bg-white'}
									contentClass={'bg-white'}
									options={UserStatus}
								/>
							</div>
						</div>
						<div className="max-xm:hidden">
							<UploadCSV type={'BRAND'} />
						</div>
					</div>
				</div>
			</div>
			{data.length > 0 ? (
				<Table className="relative">
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<div className="flex items-center gap-[10px]">
										<Checkbox
											className="checkbox-sm"
											checked={isSelectAll<BrandTable>(
												data,
												selectedItems,
											)}
											onClick={() =>
												toggleSelectAll<BrandTable>(
													data,
													selectedItems,
													setSelectedItems,
												)
											}
										/>
										<span>Category</span>
									</div>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Description
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Count</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-end">Action</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border-t-0">
						{data.map((brand, index) => (
							<TableRow
								className="border-b-0 border-t-0"
								key={index}
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<div className="flex items-center gap-[10px] min-w-[316px]">
											<Checkbox
												className="checkbox-sm"
												onClick={() =>
													toggleSelectList(
														selectedItems,
														setSelectedItems,
														brand.id,
													)
												}
												checked={isChecked(
													selectedItems,
													brand.id,
												)}
											/>
											<div className="flex items-center gap-[5px]">
												<Image
													src={
														brand.thumbnail
															? `/uploads/files/${brand.thumbnail.url}`
															: `/assets/placeholder.svg`
													}
													alt={''}
													width={150}
													height={150}
													className="h-[50px] w-[50px] rounded-md object-cover max-md:hidden"
												/>
												<div className="flex flex-col gap-[5px]">
													<span className="text-base-2">
														{brand?.name}
													</span>
													<span className="text-base-2 !text-[13px] !text-primary-green">
														{brand?.slug}
													</span>
												</div>
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{brand.description
											? brand.description
											: '--'}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{brand.isActive ? (
											<span className="badge-success">
												Active
											</span>
										) : (
											<span className="badge-danger">
												Inactive
											</span>
										)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										--
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
															setSelectedId(
																brand.id,
															)
														}
													>
														Edit Now
													</MenubarItem>
													<MenubarItem className="menubar-item">
														Delete Now
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
					title={'No brands found to show'}
					description={`Oops! It seems there are no brands available to display at the moment. 🏷️ Feel free to add your unique brands to enhance this space 🌟`}
					Links={
						<a
							href="/admin/store/brand"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Reload
						</a>
					}
				/>
			)}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1">
					{selectedItems ? selectedItems?.length : 0} row(s) selected.
				</div>
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
			{selectedId && (
				<UpdateBrand id={selectedId} onChange={setSelectedId} />
			)}
		</div>
	);
};

export default BrandList;
