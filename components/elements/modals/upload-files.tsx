'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import Uploader from '../shared/uploader';
import { useUploadFiles } from '@/lib/hooks/useFile';

const UploadFiles = () => {
	const { mutate: uploadFiles, isPending } = useUploadFiles();
	const handleUploadFiles = async (files: File[]) => {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append('files', file);
		});
		uploadFiles(formData);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg" title="Upload CSV">
					<span>Upload Files</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[600px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Upload Files
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Upload files by dragging or clicking to browse. The
						system will handle the upload automatically.
					</DialogDescription>
				</DialogHeader>
				<Uploader
					isUploading={isPending}
					onChangeFile={(files) => handleUploadFiles(files)}
					containerClass={'border h-[250px] rounded-md mt-[20px]'}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UploadFiles;
