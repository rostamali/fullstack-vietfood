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
import { toast } from 'sonner';
import { ToastError } from '../ui/custom-toast';
import {
	useUploadBrand,
	useUploadCategory,
	useUploadProduct,
	useUploadUser,
} from '@/lib/hooks/useCSV';
type CsvProps = {
	type: 'USER' | 'BRAND' | 'CATEGORY' | 'PRODUCT';
};

const UploadCSV: FC<CsvProps> = ({ type }) => {
	const [isPending, setIsPending] = useState(false);
	const { mutate: uploadUser, isPending: isUser } = useUploadUser();
	const { mutate: uploadProduct, isPending: isProduct } = useUploadProduct();
	const { mutate: uploadBrand, isPending: isBrand } = useUploadBrand();
	const { mutate: uploadCategory, isPending: isCategory } =
		useUploadCategory();

	const handleUploadCsv = (files: File[]) => {
		setIsPending(true);
		const csvFiles = files.find((file) => file.type === 'text/csv');
		if (csvFiles) {
			Papa.parse(csvFiles, {
				header: true,
				skipEmptyLines: true,
				complete: async function (value) {
					if (type === 'USER') {
						uploadUser(value.data as CSVUser[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					} else if (type === 'CATEGORY') {
						uploadCategory(value.data as CSVCategory[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					} else if (type === 'BRAND') {
						uploadBrand(value.data as CSVBrand[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					} else if (type === 'PRODUCT') {
						uploadProduct(value.data as CSVProduct[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					}
				},
			});
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
					onChangeFile={(files) => handleUploadCsv(files)}
					containerClass={'border h-[180px] rounded-md'}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UploadCSV;
