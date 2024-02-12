'use client';
import PriceFormat from '@/components/elements/shared/price-format';
import Spinner from '@/components/elements/shared/spinner';
import { Button } from '@/components/ui/button';
import { useRemoveFromWishlist } from '@/lib/hooks/useShop';
import Image from 'next/image';
import Link from 'next/link';
type CardProsp = {
	item: ProductCardProps;
};

const WishlistCard: React.FC<CardProsp> = ({ item }) => {
	const { mutate: removeFromWishlist, isPending } = useRemoveFromWishlist();
	return (
		<div className="product-card overflow-hidden group bg-white p-4 rounded">
			<div className={`flex-center rounded h-[260px] bg-[#F6F6F6]`}>
				<Image
					src={
						item.thumbnail
							? `/uploads/files/${item.thumbnail?.url}`
							: '/assets/placeholder.png'
					}
					alt={item.name}
					width={480}
					height={500}
					className="object-contain w-[70%]"
					style={{
						aspectRatio: '3/3',
					}}
				/>
			</div>
			<div className="space-y-2">
				<Link href={`/product/${item.slug}`} className="mt-3 block">
					<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green">
						{item.name}
					</h4>
					<PriceFormat
						regularClass="text-[14px]"
						saleClass="text-[18px]"
						inventory={item.inventory}
					/>
				</Link>
				<div className="flex items-center gap-2 flex-col">
					<Button className="btn-primary-sm w-full">
						Add To Cart
					</Button>
					<Button
						className="btn-ghost-sm w-full group"
						disabled={isPending}
						onClick={() => {
							removeFromWishlist({ productId: item.id });
						}}
					>
						{isPending && (
							<Spinner className="h-[20px] w-[20px] stroke-action-success group-hover:stroke-white" />
						)}
						Remove Item
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WishlistCard;
