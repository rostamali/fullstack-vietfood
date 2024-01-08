'use client';
import { DialogTrigger } from '@/components/ui/dialog';
import { formUrlQuery } from '@/lib/helpers/search-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import FileView from './file-view';
type FileCardType = {
	file: FileLibraryType;
};

const FileTrigger: FC<FileCardType> = ({ file }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const handleFilterClick = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'file_view',
			value: value.toLowerCase(),
		});
		router.push(newUrl, { scroll: false });
	};

	return (
		<DialogTrigger
			onClick={() => handleFilterClick(file.id)}
			className="w-full"
		>
			<FileView file={file} heightClass={'h-[220px]'} />
		</DialogTrigger>
	);
};

export default FileTrigger;
