import { FC, useEffect, useState } from 'react';
import FileLibraryModal from '../file-library-modal';
import Image from 'next/image';
import { Image as IconImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
type SetThumbnailProps = {
	trigger: React.ReactNode;
	modalTitle: string;
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	frameClass: string;
	thumbClass?: string;
	iconClass?: string;
	selected: FileSelection[] | null;
};

const SetThumbnail: FC<SetThumbnailProps> = ({
	onChange,
	trigger,
	frameClass,
	modalTitle,
	selected,
	thumbClass,
	iconClass,
}) => {
	const [thumbnail, setThumbnail] = useState<null | FileSelection[]>(null);
	useEffect(() => {
		setThumbnail(selected);
	}, [selected]);
	return (
		<div className="thumbnail-selection font-poppins">
			<div
				className={`border border-primary-gray border-opacity-15 relative ${frameClass}`}
			>
				{thumbnail ? (
					<div className="w-full h-full relative group overflow-hidden">
						<Image
							src={`/uploads/files/${thumbnail[0].url}`}
							alt={thumbnail[0].title}
							width={500}
							height={500}
							className={`h-full w-full object-cover ${thumbClass}`}
						/>
						<div
							className={`absolute duration-150 opacity-0 top-0 backdrop-blur-[2px] left-0 w-full h-full bg-black-dark bg-opacity-40 group-hover:opacity-[1] flex-center ${thumbClass}`}
						>
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
					<div className="w-full h-full flex items-center justify-center">
						<IconImage size={50} className={iconClass} />
					</div>
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
