'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UserStatus } from '@/constants';
import SelectFilter from '../filters/select-filter';
import { Button } from '@/components/ui/button';
import LocalSearch from '../filters/local-search';
import SmallTooltip from '../ui/small-tooltip';
import { Download } from 'lucide-react';
import Pagination from '../filters/pagination';
import { FC, useState } from 'react';
import EmptyError from '../ui/empty-error';
import {
	UserRoleFormat,
	UserStatusFormat,
	dateFormat,
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/helpers/formater';
import ActionMenu from '../ui/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import UpdateUser from '../modals/update-user';
type UserListProps = {
	data: UserList[];
	pages: number;
};

const UserList: FC<UserListProps> = ({ data, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [selectId, setSelectId] = useState<string | null>(null);

	return (
		<div className="user-table dashboard-col-space">
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
								route={'/admin/user'}
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
										<Checkbox
											className="checkbox-sm"
											checked={isSelectAll<UserList>(
												data,
												selectedItems,
											)}
											onClick={() =>
												toggleSelectAll<UserList>(
													data,
													selectedItems,
													setSelectedItems,
												)
											}
										/>
										<span>User</span>
									</div>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Role</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">IP</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Last Login
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-end">Action</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border-t-0">
						{data.map((user, index) => (
							<TableRow
								className="border-b-0 border-t-0"
								key={index}
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<div className="flex items-center gap-[10px]">
											<Checkbox
												className="checkbox-sm"
												onClick={() =>
													toggleSelectList(
														selectedItems,
														setSelectedItems,
														user.id,
													)
												}
												checked={isChecked(
													selectedItems,
													user.id,
												)}
											/>
											<div className="flex flex-col gap-[5px]">
												<span className="text-base-2">
													{user.firstName}{' '}
													{user.lastName}
												</span>
												<span className="text-base-2 !text-[13px] !text-primary-green">
													{user.email}
												</span>
											</div>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{UserRoleFormat[user.role]}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{user.status === 'ACTIVE' ? (
											<span className="badge-success">
												{UserStatusFormat[user.status]}
											</span>
										) : (
											<span className="badge-danger">
												{UserStatusFormat[user.status]}
											</span>
										)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										127.0.0.1
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{user.lastLogin
											? dateFormat(user.lastLogin)
											: 'No Activity'}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px]">
										<ActionMenu
											content={
												<>
													<MenubarItem
														className="menubar-item cursor-pointer"
														onClick={() =>
															setSelectId(user.id)
														}
													>
														Edit Profile
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
				<div className="text-base-1">
					{selectedItems ? selectedItems?.length : 0} row(s) selected.
				</div>
				<div className="">
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
			{selectId && <UpdateUser id={selectId} onChange={setSelectId} />}
		</div>
	);
};

export default UserList;
