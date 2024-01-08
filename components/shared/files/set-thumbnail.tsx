import { FC, useEffect, useState } from 'react';
import FileLibraryModal from '../file-library-modal';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
interface SetThumbnailProps {
	trigger: React.ReactNode;
	modalTitle: string;
	gallery: boolean;
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	heightWidth: string;
	borderRadius: string;
	selected: FileSelection[] | null;
}

const SetThumbnail: FC<SetThumbnailProps> = ({
	onChange,
	trigger,
	heightWidth,
	modalTitle,
	borderRadius,
	selected,
}) => {
	const [thumbnail, setThumbnail] = useState<null | FileSelection[]>(null);
	useEffect(() => {
		setThumbnail(selected);
	}, [selected]);
	return (
		<div className="thumbnail-selection">
			<div
				className={`relative ${heightWidth} ${borderRadius} bg-[#EFF1F3]`}
			>
				{thumbnail ? (
					<div
						className={`group overflow-hidden relative ${borderRadius}`}
					>
						<Image
							src={`/uploads/files/${thumbnail[0].url}`}
							alt={thumbnail[0].title}
							width={500}
							height={500}
							className={`${heightWidth} object-cover`}
						/>
						<div className="absolute duration-150 opacity-0 top-0 left-0 w-full h-full bg-black-dark bg-opacity-40 group-hover:opacity-[1] flex-center">
							<Button
								className="text-white p-0"
								onClick={() => {
									onChange(null);
									setThumbnail(null);
								}}
							>
								<Trash2 strokeWidth={2.25} />
							</Button>
						</div>
					</div>
				) : (
					<Image
						src={'/assets/placeholder.svg'}
						alt={'Placeholder'}
						width={200}
						height={200}
						className={`${heightWidth} ${borderRadius}`}
					/>
				)}
				<FileLibraryModal
					trigger={trigger}
					modalTitle={modalTitle}
					gallery={false}
					onChange={(file) => {
						onChange(file);
						setThumbnail(file);
					}}
					selected={thumbnail}
				/>
			</div>
		</div>
	);
};

export default SetThumbnail;
