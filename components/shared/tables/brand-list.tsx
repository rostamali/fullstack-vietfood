'use client';
import { useState, FC } from 'react';
import SelectFilter from '../filters/select-filter';
import { Button } from '@/components/ui/button';
import LocalSearch from '../filters/local-search';
import { UserStatus } from '@/constants';
import SmallTooltip from '../ui/small-tooltip';
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
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import ActionMenu from '../ui/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import EmptyError from '../ui/empty-error';
import Pagination from '../filters/pagination';
import Image from 'next/image';
import Category from '../forms/category';
import Brand from '../forms/brand';
type BrandProps = {
	data: BrandTable[];
	pages: number;
};

const BrandList: FC<BrandProps> = ({ data, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [details, setDetails] = useState<{
		id: string | null;
		data: BrandForm | null;
	}>({
		id: null,
		data: null,
	});
	const handleSingleData = (brand: BrandTable) => {
		setDetails({
			id: brand.id,
			data: {
				name: brand.name,
				description: brand.description || '',
				thumbnail: brand.thumbnail ? [brand.thumbnail] : null,
				contactName: brand.contactName || undefined,
				contactEmail: brand.contactEmail || undefined,
				contactPhone: brand.contactPhone || undefined,
				contactWebsite: brand.contactWebsite || undefined,
			},
		});
	};
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
							<Collapsible key={index} asChild>
								<>
									<TableRow className="border-b-0 border-t-0">
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
															<MenubarItem className="menubar-item">
																<CollapsibleTrigger
																	className="w-full text-left"
																	onClick={() =>
																		handleSingleData(
																			brand,
																		)
																	}
																>
																	Edit Now
																</CollapsibleTrigger>
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
									<CollapsibleContent
										asChild
										className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
									>
										<>
											<TableRow className="border-b-0 border-t-0">
												<TableCell
													colSpan={6}
													className="p-0"
												>
													<div className="table-cell-data rounded-md table-cell-data-start table-cell-data-end w-full">
														<div className="w-full">
															{details && (
																<Brand
																	value={
																		details.data as BrandForm
																	}
																	id={
																		details.id
																	}
																	type={
																		'UPDATE'
																	}
																/>
															)}
														</div>
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
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'No user found to show'}
					titleClass={''}
					description={`Oops! Currently, there are no users to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					descriptionClass={''}
					Links={
						<a
							href="/admin/user"
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
		</div>
	);
};

export default BrandList;
