'use client';
interface ModalLibraryProps {
	trigger: React.ReactNode;
	modalTitle: string;
	gallery: boolean;
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	selected: FileSelection[] | null;
}
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import LibraryFiles from './library-files';
import { fetchFilesOnModal } from '@/lib/actions/file.action';

const FileLibraryModal: FC<ModalLibraryProps> = ({
	modalTitle,
	gallery,
	onChange,
	selected,
	trigger,
}) => {
	const [files, setFiles] = useState<ModalLibraryFiles>({
		data: null,
		type: 'all',
		isNext: false,
		page: 1,
		pageSize: 9,
	});
	const [items, setItems] = useState<FileSelection[] | null>(null);
	useEffect(() => {
		const fetchFiles = async () => {
			const result = await fetchFilesOnModal({
				type: files.type,
				page: files.page,
				pageSize: files.pageSize,
			});
			setFiles({
				...files,
				data: result?.files ? result?.files : null,
				isNext: result ? result.isNext : false,
			});
		};
		fetchFiles();
		setItems(selected);
	}, [files.page, files.type, selected]);

	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent className="xl:max-w-[1200px] max-w-[95%] bg-white border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
							{modalTitle}
						</div>
					</DialogTitle>
					<DialogDescription>
						<span className="text-base-2 text-primary-black-dark dark:text-primary-black-dark">
							Upload files by dragging or clicking to browse. The
							system will handle the upload automatically.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="modal-library-container my-[25px]">
					<LibraryFiles
						files={files.data ? files.data : []}
						selected={items}
						setItems={setItems}
						gallery={gallery}
					/>
					<div className="flex-center mt-[15px]">
						{files.isNext && (
							<Button
								className="p-0"
								onClick={() => {
									setFiles({
										...files,
										page: files.page + 1,
									});
								}}
							>
								Load More
							</Button>
						)}
					</div>
				</div>
				<div className="flex items-center justify-between gap-[15px]">
					<div className="text-base-1">
						{items ? items.length : 0} file(s) selected.
					</div>
					<DialogClose asChild>
						<Button
							className="btn-primary-sm"
							onClick={() => onChange(items)}
						>
							Insert
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FileLibraryModal;
