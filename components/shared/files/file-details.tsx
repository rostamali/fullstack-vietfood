'use client';
import { fetchFileDetailsbyAdmin } from '@/lib/actions/file.action';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UpdateFile from '../forms/update-file';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { dateFormat } from '@/lib/helpers/formater';
import FileDetailScreen from '@/components/loading/file-details-screen';
import FileView from './file-view';

const FileDetails = () => {
	const [details, setDetails] = useState<FileDetailsView | null>(null);
	const searchParams = useSearchParams();
	const fileId = searchParams.get('file_view');
	useEffect(() => {
		const fetchDetails = async () => {
			const result = await fetchFileDetailsbyAdmin({
				id: fileId as string,
			});
			setDetails(result ? result : null);
		};

		fetchDetails();
	}, [fileId]);
	if (!details) return <FileDetailScreen />;

	return (
		<div className="file-details">
			<DialogHeader>
				<DialogTitle asChild>
					<h4 className="heading-4 !font-medium">File Details</h4>
				</DialogTitle>
				<div className="text-base-2">{details?.title}</div>
			</DialogHeader>
			<div className="grid md:grid-cols-2 grid-cols-1 gap-[25px] items-center my-[30px]">
				<div className="flex flex-col gap-[10px]">
					<FileView
						file={{
							id: details.id,
							fileType: details.fileType,
							url: details.url,
							title: details.title,
						}}
						heightClass={'h-[220px]'}
					/>
				</div>
				<div className="file-info-wrap">
					<div className="grid grid-cols-2 gap-[20px]">
						<div className="file-info">
							<h6 className="heading-6">Size:</h6>
							<p className="text-base-2 mt-[4px]">
								<span className="badge-info">
									{details?.size}
								</span>
							</p>
						</div>
						<div className="file-info">
							<h6 className="heading-6">Uploaded date:</h6>
							<p className="text-base-2 mt-[4px]">
								{dateFormat(details?.createdAt)}
							</p>
						</div>
						<div className="file-info">
							<h6 className="heading-6">Compress:</h6>
							<p className="text-base-2 mt-[4px]">
								{details.isCompress ? 'True' : 'False'}
							</p>
						</div>
						<div className="file-info">
							<h6 className="heading-6">Compress %:</h6>
							<p className="text-base-s mt-[4px]">
								<span className="badge-info">
									{details.compressPercent
										? `${details.compressPercent}%`
										: '0%'}
								</span>
							</p>
						</div>
					</div>
					<div className="mt-[20px]">
						<h6 className="heading-6">Actions:</h6>
						<div className="flex items-center gap-[5px] mt-[5px]">
							<Button className="p-0 h-auto badge-danger">
								Delete
							</Button>
							<Button className="p-0 h-auto badge-success">
								Compress
							</Button>
						</div>
					</div>
				</div>
			</div>
			<UpdateFile
				author={
					details.author
						? {
								name: `${details.author.firstName} ${details.author.lastName}`,
								role: details.author.role,
						  }
						: null
				}
				defaultValues={{
					title: details.title,
					description: details.description ? details.description : '',
				}}
				fileId={details.id}
			/>
		</div>
	);
};

export default FileDetails;
