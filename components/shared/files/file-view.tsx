'use client';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
type FileCardType = {
	file: FileLibraryType;
	heightClass: string;
};

const FileView: FC<FileCardType> = ({ file, heightClass }) => {
	return (
		<div className="file-view rounded-md overflow-hidden relative group border border-primary-gray border-opacity-10">
			{file.fileType === 'image' && (
				<Image
					src={`/uploads/files/${file?.url}`}
					alt={file?.title}
					priority={true}
					width={1240}
					height={750}
					className={`object-cover ${heightClass}`}
				/>
			)}
			{file.fileType === 'application' && (
				<div
					className={`${heightClass} w-full bg-white flex flex-col gap-[10px] items-center justify-center text-center p-[25px]`}
				>
					<FileText size={70} className="text-action-success" />
					<div className="absolute bg-white w-full bottom-0 p-3 border-t border-primary-gray border-opacity-20">
						<p className="text-base-2">{file.title}</p>
					</div>
				</div>
			)}
			{/* {file.fileType === 'video' && (
				<Video
					url={file.url}
					className={'!h-[220px] !w-[100%] border bg-white'}
				/>
			)} */}
			<div className="absolute duration-150 opacity-0 top-0 left-0 w-full h-full bg-black-dark bg-opacity-40 group-hover:opacity-[1]"></div>
		</div>
	);
};

export default FileView;
