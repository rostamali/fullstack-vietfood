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
import UpdateCategory from '../../../../components/elements/modals/update-category';
import { useDeleteCategory } from '@/lib/hooks/useCategory';

type CategoryProps = {
	data: CategoryTable[];
	pages: number;
};

const CategoryList: FC<CategoryProps> = ({ data, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const { mutate: deleteCategory, isPending } = useDeleteCategory();

	return (
		<div className="category-table dashboard-col-space">
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<Button
							className="btn-primary-lg"
							disabled={
								isPending ? true : selectedItems ? false : true
							}
							onClick={() => {
								if (selectedItems) {
									deleteCategory(selectedItems);
									setSelectedItems(null);
								}
							}}
						>
							Delete Selected
						</Button>
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
							<SmallTooltip
								trigger={
									<Button className="btn-ghost-lg">
										<Download strokeWidth={1.5} size={20} />
									</Button>
								}
								content={'Export Data'}
							/>
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
											checked={isSelectAll<CategoryTable>(
												data,
												selectedItems,
											)}
											onClick={() =>
												toggleSelectAll<CategoryTable>(
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
								<div className="table-head-data">Parent</div>
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
						{data.map((category, index) => (
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
														category.id,
													)
												}
												checked={isChecked(
													selectedItems,
													category.id,
												)}
											/>
											<div className="flex items-center gap-[5px]">
												<Image
													src={
														category.thumbnail
															? `/uploads/files/${category.thumbnail.url}`
															: `/assets/placeholder.svg`
													}
													alt={''}
													width={150}
													height={150}
													className="h-[50px] w-[50px] rounded-md object-cover max-md:hidden"
												/>
												<div className="flex flex-col gap-[5px]">
													<span className="text-base-2">
														{category?.name}
													</span>
													<span className="text-base-2 !text-[13px] !text-primary-green">
														{category?.slug}
													</span>
												</div>
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px] min-w-[250px]">
										{category?.description
											? category.description
											: '--'}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{category.isActive ? (
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
										{category.parentCategory
											? category.parentCategory.name
											: '--'}
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
																category.id,
															)
														}
													>
														Edit Now
													</MenubarItem>
													<MenubarItem
														disabled={isPending}
														className="menubar-item"
														onClick={() => {
															deleteCategory([
																category.id,
															]);
														}}
													>
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
					title={'No category found to show'}
					description={`Oops! Currently, there are no category to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={
						<a
							href="/admin/store/category"
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
			{selectedId && (
				<UpdateCategory id={selectedId} onChange={setSelectedId} />
			)}
		</div>
	);
};

export default CategoryList;
