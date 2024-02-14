'use client';
import { Button } from '@/components/ui/button';
import { useRemoveFromCart } from '@/lib/hooks/useOrder';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
type CardProps = {
	data: {
		cartItemId: string;
		name: string;
		thumbnail: string | null;
		category: string;
		quantity: number;
		unitPrice: number;
		totalCost: number;
	};
};

const CartItem: React.FC<CardProps> = ({ data }) => {
	const { mutate: removeFromCart, isPending } = useRemoveFromCart();

	return (
		<div className="bg-white border-b-2 border-b-gray-muted py-[30px] px-[30px]">
			<div className="grid md:grid-cols-8 grid-cols-3 gap-[25px] items-center">
				{/* product info */}
				<div className="xl:col-span-3 md:col-span-3 col-span-3 flex gap-[12px] items-center order-1">
					<Image
						src={
							data?.thumbnail
								? `/uploads/files/${data.thumbnail}`
								: '/assets/placeholder.svg'
						}
						alt={data.name}
						width={400}
						height={400}
						className="h-[80px] w-[80px] border-light rounded-md object-contain bg-transparent"
					/>

					<div className="cart-product-info flex-1">
						<h2 className="text-heading-6">{data.name}</h2>
						<span className="text-base-2">{data.category}</span>
					</div>
				</div>
				{/* unit price */}
				<div className="md:text-center order-2 md:col-span-1 col-span-3">
					<div className="flex items-center justify-between">
						<span className="md:hidden text-base-1">
							Unit Price:
						</span>
						<span className="text-base-1">
							${data.unitPrice.toFixed(2)}
						</span>
					</div>
				</div>
				{/* product cart qty */}
				<div className="md:col-span-2 col-span-2 md:order-3 order-5">
					<div className="flex items-center justify-start">
						<button className="border-2 border-r-0 h-[45px] w-[45px] flex-center text-black-dark">
							<Minus size={20} />
						</button>
						<div className="border-t-2 border-b-2 border-t-gray-muted h-[45px] w-[40px] flex-center text-base-1">
							{data.quantity}
						</div>
						<button className="border-2 border-l-0 h-[45px] w-[45px] flex-center text-black-dark">
							<Plus size={20} />
						</button>
					</div>
				</div>
				{/* total price */}
				<div className="md:text-center order-3 md:order-4 md:col-span-1 col-span-3">
					<div className="flex items-center justify-between">
						<span className="md:hidden text-base-1">
							Total Price:
						</span>
						<span className="text-base-1">
							${data.totalCost.toFixed(2)}
						</span>
					</div>
				</div>
				{/* shop cart remove btn */}
				<div className="text-right order-5 flex items-center justify-end">
					<Button
						className="h-7 w-7 border-2 p-0 text-action-danger border-action-danger"
						onClick={() => {
							removeFromCart({ cartItemId: data.cartItemId });
						}}
						disabled={isPending}
					>
						<X size={18} strokeWidth={2.5} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
