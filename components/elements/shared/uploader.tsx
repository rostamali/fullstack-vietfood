import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useCallback, FC } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from './spinner';
type UploaderProps = {
	onChangeFile: (values: File[]) => void;
	containerClass: string;
	isUploading: boolean;
};

const Uploader: FC<UploaderProps> = ({
	onChangeFile,
	containerClass,
	isUploading,
}) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		onChangeFile(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});
	return (
		<div className={containerClass}>
			{!isUploading ? (
				<div className="h-full" {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<div className="flex-center text-center flex-col h-full gap-[12px]">
							<UploadCloud size={30} />
							<h5 className="heading-5 !font-medium">
								Drag and drop files here...
							</h5>
						</div>
					) : (
						<div className="flex-center text-center flex-col h-full gap-[12px]">
							<UploadCloud size={30} />
							<h5 className="heading-5 !font-medium">
								Drag and drop files here
								<br />
								or
								<br />
								<Button className="btn-primary-sm">
									Browse Files
								</Button>
							</h5>
						</div>
					)}
				</div>
			) : (
				<div className="flex items-center justify-center h-full">
					<Spinner
						className={'h-[30px] w-[30px] stroke-primary-green'}
					/>
				</div>
			)}
		</div>
	);
};

export default Uploader;
