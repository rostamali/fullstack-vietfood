import Image from 'next/image';
import { FC } from 'react';
type ProductSmProps = {
	name: string;
	thumbnail: {
		id: string;
		fileType: string;
		title: string;
		url: string;
	} | null;
};
const ProductCardSm: FC<ProductSmProps> = ({ name, thumbnail }) => {
	return (
		<div className="flex items-center gap-2">
			<Image
				src={
					thumbnail
						? `/uploads/files/${thumbnail.url}`
						: '/assets/placeholder.png'
				}
				alt={name}
				width={100}
				height={100}
				className={`h-[70px] w-[70px] aspect-auto rounded-md overflow-hidden ${
					thumbnail ? 'bg-white' : 'bg-primary-gray'
				}`}
			/>
			<div className="flex-1">
				<h4 className="text-[14px] font-medium text-black-dark">
					{name}
				</h4>
				<span>$26.00</span>
			</div>
		</div>
	);
};

export default ProductCardSm;
