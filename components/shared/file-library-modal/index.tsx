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
import { useModalList } from '@/lib/hooks/useFile';
import ModalLibraryScreen from '@/components/loading/modal-library-screen';

const FileLibraryModal: FC<ModalLibraryProps> = ({
	modalTitle,
	gallery,
	onChange,
	selected,
	trigger,
}) => {
	const [filter, setFilter] = useState({
		page: 1,
		type: 'all',
	});

	const [items, setItems] = useState<FileSelection[] | null>(null);
	useEffect(() => {
		setItems(selected);
	}, [selected]);
	const { data, isLoading, isFetching } = useModalList(
		filter.type,
		filter.page,
	);

	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent className="xl:max-w-[1200px] max-w-[95%] bg-white border-none">
				{!isLoading && !isFetching && data ? (
					<>
						<DialogHeader>
							<DialogTitle>
								<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
									{modalTitle}
								</div>
							</DialogTitle>
							<DialogDescription>
								<span className="text-base-2 text-primary-black-dark dark:text-primary-black-dark">
									Upload files by dragging or clicking to
									browse. The system will handle the upload
									automatically.
								</span>
							</DialogDescription>
						</DialogHeader>
						<div className="modal-library-container my-[25px]">
							<LibraryFiles
								files={data ? data.files : []}
								selected={items}
								setItems={setItems}
								gallery={gallery}
							/>
							<div className="flex-center mt-[15px]">
								{data.isNext && (
									<Button
										className="p-0"
										onClick={() => {
											setFilter({
												...filter,
												page: filter.page + 1,
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
					</>
				) : (
					<ModalLibraryScreen />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default FileLibraryModal;
