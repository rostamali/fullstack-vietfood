'use client';
import { useSearchParams } from 'next/navigation';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserRoleFormat, dateFormat } from '@/lib/helpers/formater';
import FileDetailScreen from '@/components/loading/file-details-screen';
import FileView from './file-view';
import { useFileDetails } from '@/lib/hooks/useFile';
import CompressFile from './compress-file';

const FileDetails = () => {
	const searchParams = useSearchParams();
	const fileId = searchParams.get('file_view');
	const { data, isLoading, isError } = useFileDetails(fileId as string);
	if (isLoading || isError || !data) return <FileDetailScreen />;

	return (
		<div className="file-details">
			<DialogHeader>
				<DialogTitle asChild>
					<h4 className="heading-4 !font-medium">File Details</h4>
				</DialogTitle>
				<div className="text-base-2">{data?.title}</div>
			</DialogHeader>
			<div className="grid md:grid-cols-2 grid-cols-1 gap-[25px] items-center my-[30px]">
				<div className="flex flex-col gap-[10px]">
					<FileView
						file={{
							id: data.id,
							fileType: data.fileType,
							url: data.url,
							title: data.title,
						}}
						heightClass={'h-[220px]'}
					/>
					<div className="grid grid-cols-2 gap-[20px]">
						<div className="file-info">
							<h6 className="heading-6">Size:</h6>
							<p className="text-base-2 mt-[4px]">
								<span className="badge-info">{data.size}</span>
							</p>
						</div>
						<div className="file-info">
							<h6 className="heading-6">Uploaded date:</h6>
							<p className="text-base-2 mt-[4px]">
								{dateFormat(data?.createdAt)}
							</p>
						</div>
					</div>
				</div>
				<div className="file-info-wrap">
					<h5 className="heading-5 mb-4">Compress File</h5>
					<CompressFile fileId={data.id} />
				</div>
			</div>

			{data.author && (
				<div className="flex items-center gap-[5px]">
					<div className="h-[45px] w-[45px] bg-primary-gray rounded-full"></div>
					<div className="flex flex-col gap-[4px]">
						<p className="text-base-1">
							{data.author.firstName} {data.author.lastName}
						</p>
						<span className="text-base-2 !text-[13px]">
							{UserRoleFormat[data.author.role]}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default FileDetails;
