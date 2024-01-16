import PriceFormat from '@/components/shared/ui/price-format';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type ProductCardProps = {
	product: {
		id: string;
		name: string;
		slug: string;
		thumbnail: {
			id: string;
			fileType: string;
			title: string;
			url: string;
		} | null;
		inventory: {
			regularPrice: number | null;
			salePrice: number | null;
			inStock: boolean;
		} | null;
	};
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	return (
		<div className="product-card overflow-hidden group">
			<div
				className={`flex-center h-[260px] ${
					product.thumbnail ? 'bg-[#F6F6F6]' : 'bg-[#F6F6F6]'
				}`}
			>
				<Image
					src={
						product.thumbnail
							? `/uploads/files/${product.thumbnail?.url}`
							: '/assets/placeholder.png'
					}
					alt=""
					width={480}
					height={500}
					className="object-contain w-[90%]"
					style={{
						aspectRatio: '3/2',
					}}
				/>
			</div>
			<Link href={`/product/${product.slug}`} className="mt-3 block">
				<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green">
					{product.name.substring(0, 30)}...
				</h4>
				<PriceFormat inventory={product.inventory} />
			</Link>
		</div>
	);
};

export default ProductCard;
