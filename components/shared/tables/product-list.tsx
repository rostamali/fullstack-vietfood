'use client';
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
import Pagination from '../filters/pagination';
import ActionMenu from '../ui/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import Link from 'next/link';
import EmptyError from '../ui/empty-error';
import { dateFormat } from '@/lib/helpers/formater';
import LocalSearch from '../filters/local-search';
import SelectFilter from '../filters/select-filter';
import { UserAction, UserStatus } from '@/constants';
import SelectField from '../ui/select-field';
import { Button } from '@/components/ui/button';
import SmallTooltip from '../ui/small-tooltip';
import { Download } from 'lucide-react';
import Image from 'next/image';
type ProductListProps = {
	data: ProductList[];
	pages: number;
};

const ProductList: FC<ProductListProps> = ({ data, pages }) => {
	return (
		<div className="product-table dashboard-col-space">
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<SelectField
							triggerClass={'input-field-lg bg-white'}
							placeholder={'Select action'}
							defaultValue={''}
							onChange={() => {}}
							options={UserAction}
						/>
						<Button className="btn-primary-lg">Apply</Button>
					</div>
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/product'}
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
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<div className="flex items-center gap-[10px]">
										<Checkbox className="checkbox-sm" />
										<span>Product</span>
									</div>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Stock</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Price</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Categories
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
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
										<div className="flex items-center gap-[10px]">
											<Checkbox className="checkbox-sm" />
											<div className="flex items-center gap-1.5">
												<Image
													src={
														item.thumbnail
															? `/uploads/files/${item.thumbnail.url}`
															: '/assets/placeholder.png'
													}
													alt={item.name}
													width={100}
													height={100}
													className={`h-[55px] w-[55px] border-light rounded-md object-contain ${
														item.thumbnail
															? 'bg-transparent'
															: 'bg-primary-gray bg-opacity-30'
													}`}
												/>
												<div className="flex flex-col gap-[5px]">
													<span className="text-base-2">
														{item.name}
													</span>
												</div>
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.inventory?.inStock ? (
											<span className="badge-success">
												Instock
											</span>
										) : (
											<span className="badge-danger">
												Stock out
											</span>
										)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										$
										{item.inventory?.regularPrice
											? item.inventory?.regularPrice?.toFixed(
													2,
											  )
											: `0.00`}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										--
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{item.status === 'ACTIVE' ? (
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
									<div className="table-cell-end min-h-[80px]">
										<ActionMenu
											content={
												<>
													<MenubarItem className="menubar-item cursor-pointer">
														<Link
															href={`/admin/product/edit?product_id=${item.id}`}
														>
															Edit Product
														</Link>
													</MenubarItem>
													<MenubarItem className="menubar-item">
														Ban Profile
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
					title={'No products available'}
					description={`Oops! It looks like there are no products available right now. 🛍️ Add new products to keep your catalog vibrant and exciting! 🌟`}
					Links={
						<Link
							href="/admin/product/create"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Create Product
						</Link>
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

export default ProductList;
