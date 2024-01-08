'use client';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import Uploader from '../ui/uploader';
import { FC, useState } from 'react';
import { Upload } from 'lucide-react';
import { importUsersFromCSV } from '@/lib/actions/auth.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../ui/custom-toast';
import { importCategoryFromCSV } from '@/lib/actions/category.action';
import { importBrandFromCSV } from '@/lib/actions/brand.action';
type CsvProps = {
	type: 'USER' | 'BRAND' | 'CATEGORY';
};

const UploadCSV: FC<CsvProps> = ({ type }) => {
	const [isPending, setIsPending] = useState(false);

	const handleUploadFiles = (files: File[]) => {
		setIsPending(true);
		const csvFiles = files.find((file) => file.type === 'text/csv');
		if (csvFiles) {
			try {
				Papa.parse(csvFiles, {
					header: true,
					skipEmptyLines: true,
					complete: async function (value) {
						if (type === 'USER') {
							const result = await importUsersFromCSV(
								value.data as CSVUser[],
							);
							setIsPending(false);
							if (result.success) {
								toast.custom((t) => (
									<ToastSuccess
										toastNumber={t}
										content={result.message}
									/>
								));
							} else {
								toast.custom((t) => (
									<ToastError
										toastNumber={t}
										content={result.message}
									/>
								));
							}
						} else if (type === 'CATEGORY') {
							const result = await importCategoryFromCSV(
								value.data as CSVCategory[],
							);
							setIsPending(false);
							if (result.success) {
								toast.custom((t) => (
									<ToastSuccess
										toastNumber={t}
										content={result.message}
									/>
								));
							} else {
								toast.custom((t) => (
									<ToastError
										toastNumber={t}
										content={result.message}
									/>
								));
							}
						} else if (type === 'BRAND') {
							const result = await importBrandFromCSV(
								value.data as CSVBrand[],
							);
							setIsPending(false);
							if (result.success) {
								toast.custom((t) => (
									<ToastSuccess
										toastNumber={t}
										content={result.message}
									/>
								));
							} else {
								toast.custom((t) => (
									<ToastError
										toastNumber={t}
										content={result.message}
									/>
								));
							}
						}
					},
				});
			} catch (error: any) {
				setIsPending(false);
				toast.custom((t) => (
					<ToastError toastNumber={t} content={error.message} />
				));
			}
		} else {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Upload CSV file only`} />
			));
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg" title="Upload CSV">
					<Upload strokeWidth={1.5} size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">Upload CSV</DialogTitle>
					<DialogDescription className="text-base-2">
						Import list of data from CSV files.
					</DialogDescription>
				</DialogHeader>
				<Uploader
					isUploading={isPending}
					onChangeFile={(files) => handleUploadFiles(files)}
					containerClass={'border h-[180px] rounded-md'}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UploadCSV;
