'use client';
import {} from '@/lib/actions/file.action';
import { FC } from 'react';
import FileView from '../files/file-view';
import { Checkbox } from '@/components/ui/checkbox';
import { isFileSelected, toggleFileSelection } from '@/lib/helpers/formater';
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
						<div className="single-file relative" key={index}>
							<FileView file={file} heightClass="h-[180px]" />
							<div className="bg-white absolute top-3 right-3 h-[28px] w-[28px] flex-center rounded-full">
								<Checkbox
									className="checkbox-sm !rounded-full"
									onClick={() => {
										toggleFileSelection(
											file,
											setItems,
											selected,
											gallery,
										);
									}}
									checked={isFileSelected(file, selected)}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				'Empty'
			)}
		</div>
	);
};

export default LibraryFiles;
