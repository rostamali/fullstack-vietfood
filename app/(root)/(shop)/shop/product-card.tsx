import PriceFormat from '@/components/elements/shared/price-format';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type CardProps = {
	product: ProductCardProps;
};

const ProductCard: FC<CardProps> = ({ product }) => {
	return (
		<div className="product-card overflow-hidden group bg-white p-4 rounded">
			<div
				className={`flex-center rounded h-[260px] ${
					product.thumbnail ? 'bg-[#F6F6F6]' : 'bg-[#F6F6F6]'
				}`}
			>
				<Image
					src={
						product.thumbnail
							? `/uploads/files/${product.thumbnail?.url}`
							: '/assets/placeholder.png'
					}
					alt={product.name}
					width={480}
					height={500}
					className="object-contain w-[70%]"
					style={{
						aspectRatio: '3/3',
					}}
				/>
			</div>
			<Link href={`/product/${product.slug}`} className="mt-3 block">
				<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green">
					{product.name.substring(0, 30)}...
				</h4>
				<PriceFormat
					regularClass="text-[14px]"
					saleClass="text-[18px]"
					inventory={product.inventory}
				/>
			</Link>
		</div>
	);
};

export default ProductCard;
