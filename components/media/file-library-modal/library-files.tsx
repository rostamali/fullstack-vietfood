'use client';
import {} from '@/lib/actions/file.action';
import { FC } from 'react';
import FileView from '../files/file-view';
import { Checkbox } from '@/components/ui/checkbox';
import { isFileSelected, toggleFileSelection } from '@/lib/helpers/formater';
import EmptyError from '../../elements/shared/empty-error';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
type libraryFile = {
	gallery: boolean;
	files: FileSelection[];
	selected: FileSelection[] | null;
	setItems: (value: FileSelection[] | null) => void;
};
const LibraryFiles: FC<libraryFile> = ({
	files,
	gallery,
	setItems,
	selected,
}) => {
	return (
		<div className="library-files">
			{files.length > 0 ? (
				<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[25px]">
					{files.map((file, index) => (
						<div
							className="single-file relative cursor-pointer"
							key={index}
							onClick={() => {
								toggleFileSelection(
									file,
									setItems,
									selected,
									gallery,
								);
							}}
						>
							<FileView file={file} heightClass="h-[180px]" />
							<div className="bg-white absolute top-3 right-3 h-[28px] w-[28px] flex-center rounded-full">
								<Checkbox
									className="checkbox-sm !rounded-full"
									checked={isFileSelected(file, selected)}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="sm:max-w-[450px] mx-auto pt-[40px]">
					<div className="flex-center flex-col gap-3 text-center">
						<h4 className="heading-4">
							There are no files to show
						</h4>
						<p className="text-base-1">
							Whoa! It looks like the files directory is currently
							empty. 📂 No files are present in this location.
						</p>
						<Link href="/admin/files">
							<Button className="btn-primary-sm">
								Upload Files
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default LibraryFiles;
