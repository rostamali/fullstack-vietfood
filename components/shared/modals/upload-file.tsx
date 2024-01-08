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
import { Upload } from 'lucide-react';
import Uploader from '../ui/uploader';
import { useState } from 'react';
import { uploadFilesByAdmin } from '@/lib/actions/file.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';

const UploadFile = () => {
	const [isPending, setIsPending] = useState(false);
	const handleUploadFiles = async (files: File[]) => {
		setIsPending(true);
		try {
			const formData = new FormData();
			files.forEach((file) => {
				formData.append('files', file);
			});
			const result = await uploadFilesByAdmin(formData);
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`File upload failed`} />
			));
		}
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

export default UploadFile;
