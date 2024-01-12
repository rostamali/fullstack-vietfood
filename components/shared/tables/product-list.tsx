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
import { UserStatusFormat, dateFormat } from '@/lib/helpers/formater';
type ProductListProps = {
	data: ProductList[];
	pages: number;
};

const ProductList: FC<ProductListProps> = ({ data, pages }) => {
	return (
		<div className="product-table dashboard-col-space">
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
								<div className="table-head-data">Created</div>
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
											<div className="flex flex-col gap-[5px]">
												<span className="text-base-2">
													{item.name}
												</span>
												{/* <span className="text-base-2 !text-[13px] !text-primary-green">
													{user.email}
												</span> */}
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
									<div className="table-cell-data min-h-[80px]">
										{dateFormat(item.createdAt)}
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
