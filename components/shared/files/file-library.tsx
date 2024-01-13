'use client';
import { FC, useState } from 'react';
type FileListProps = {
	files: FileLibraryType[];
	pages: number;
};
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FileDetails from './file-details';
import FileTrigger from './file-trigger';
import Pagination from '../filters/pagination';
import SelectFilter from '../filters/select-filter';
import LocalSearch from '../filters/local-search';
import { FileTypes } from '@/constants';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { isChecked, toggleSelectList } from '@/lib/helpers/formater';
import { useDeleteFiles } from '@/lib/hooks/useFile';
import EmptyError from '../ui/empty-error';

const FileLibrary: FC<FileListProps> = ({ files, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const { mutate: deleteFiles, isPending } = useDeleteFiles();

	return (
		<div className="file-library dashboard-col-space">
			<div className="library-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<Button
							className="btn-primary-lg"
							disabled={
								isPending ? true : selectedItems ? false : true
							}
							onClick={() => {
								if (selectedItems) {
									deleteFiles(selectedItems);
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
								route={'/admin/files'}
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
									filterKey={'type'}
									placeholder={'Filter by type'}
									triggerClass={'input-field-lg bg-white'}
									contentClass={'bg-white'}
									options={FileTypes}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog>
				{files.length > 0 ? (
					<div className="grid lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[25px]">
						{files.map((file, index) => (
							<div className="single-card relative" key={index}>
								<FileTrigger file={file} />
								<div className="bg-white absolute top-3 right-3 h-[28px] w-[28px] flex-center rounded-full">
									<Checkbox
										className="checkbox-sm !rounded-full"
										onClick={() =>
											toggleSelectList(
												selectedItems,
												setSelectedItems,
												file.id,
											)
										}
										checked={isChecked(
											selectedItems,
											file.id,
										)}
									/>
								</div>
							</div>
						))}
					</div>
				) : (
					<EmptyError
						contentClass={
							'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
						}
						title={'There are no files to show'}
						description={`Whoa! It looks like the files directory is currently empty. 📂 No files are present in this location.`}
						Links={
							<a
								href="/admin/files"
								className="btn-navlink btn-navlink-active !w-auto"
							>
								Reload
							</a>
						}
					/>
				)}
				<DialogContent className="bg-white max-w-[650px] max-md:w-[95%] max-md:h-[500px] max-md:overflow-y-scroll">
					<FileDetails />
				</DialogContent>
			</Dialog>
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1">
					{selectedItems ? selectedItems.length : 0} file(s) selected.
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
		</div>
	);
};

export default FileLibrary;
