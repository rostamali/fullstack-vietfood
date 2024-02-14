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
import { UserAction, UserStatus } from '@/constants';
import SelectFilter from '../../../components/elements/filters/select-filter';
import { Button } from '@/components/ui/button';
import LocalSearch from '../../../components/elements/filters/local-search';
import SmallTooltip from '../../../components/elements/shared/small-tooltip';
import { Download } from 'lucide-react';
import Pagination from '../../../components/elements/filters/pagination';
import { FC, useState } from 'react';
import EmptyError from '../../../components/elements/shared/empty-error';
import {
	UserRoleFormat,
	UserStatusFormat,
	dateFormat,
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/helpers/formater';
import ActionMenu from '../../../components/elements/shared/action-menu';
import { MenubarItem } from '@/components/ui/menubar';
import UpdateUser from '../../../components/elements/modals/update-user';
import { useDeleteAccount } from '@/lib/hooks/useAuth';
import SelectField from '../../../components/elements/select/select-field';
import { toast } from 'sonner';
import { ToastError } from '../../../components/elements/shared/custom-toast';
type UserListProps = {
	data: UserList[];
	pages: number;
};

const UserList: FC<UserListProps> = ({ data, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [selectId, setSelectId] = useState<string | null>(null);
	const [actionType, setActionType] = useState<string | null>();
	const { mutate: deleteAccount, isPending } = useDeleteAccount();
	const handleUserAction = () => {
		if (selectedItems) {
			deleteAccount({
				ids: selectedItems,
				actionType: actionType as 'DEACTIVE' | 'DELETE',
			});
			setSelectedItems(null);
			setActionType(null);
		} else {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Select user first`} />
			));
		}
	};
	const banProfile = (ids: string[]) => {
		deleteAccount({
			ids,
			actionType: 'DEACTIVE',
		});
	};

	return (
		<div className="user-table dashboard-col-space">
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<SelectField
							triggerClass={'input-field-lg bg-white'}
							placeholder={'Select action'}
							defaultValue={actionType ? actionType : ''}
							onChange={setActionType}
							options={UserAction}
						/>
						<Button
							className="btn-primary-lg"
							disabled={
								isPending ? true : actionType ? false : true
							}
							onClick={handleUserAction}
						>
							Apply
						</Button>
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
							<SmallTooltip content={'Export Data'}>
								<Button className="btn-ghost-lg">
									<Download strokeWidth={1.5} size={20} />
								</Button>
							</SmallTooltip>
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
													<MenubarItem
														disabled={isPending}
														className="menubar-item"
														onClick={() => {
															banProfile([
																user.id,
															]);
														}}
													>
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
					title={'No user found to show'}
					description={`Oops! Currently, there are no users to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
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
			{selectId && <UpdateUser id={selectId} onChange={setSelectId} />}
		</div>
	);
};

export default UserList;
