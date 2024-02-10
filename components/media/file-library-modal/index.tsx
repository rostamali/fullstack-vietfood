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
import ModalLibraryScreen from '@/components/loading/modal-library-screen';
import { useLoadModalFiles } from '@/lib/hooks/useInfinity';

const FileLibraryModal: FC<ModalLibraryProps> = ({
	modalTitle,
	gallery,
	onChange,
	selected,
	trigger,
}) => {
	const {
		data: library,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useLoadModalFiles();
	const [items, setItems] = useState<FileSelection[] | null>(null);
	useEffect(() => {
		setItems(selected);
	}, [selected]);

	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent className="xl:max-w-[1200px] max-w-[95%] bg-white border-none">
				{!isLoading && library ? (
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
							<div className="flex flex-col gap-[25px]">
								{library?.pages.map((files, index) => (
									<LibraryFiles
										files={files}
										selected={items}
										setItems={setItems}
										gallery={gallery}
										key={index}
									/>
								))}
							</div>
							{hasNextPage && (
								<div className="flex-center mt-[15px]">
									<Button
										className="btn-primary-sm"
										onClick={() => fetchNextPage()}
										disabled={hasNextPage ? false : true}
									>
										{isFetchingNextPage
											? 'Loading more...'
											: hasNextPage
											? 'Load more'
											: 'Nothing to load'}
									</Button>
								</div>
							)}
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
