import { Skeleton } from '../ui/skeleton';

const CartSummaryScreen = () => {
	return (
		<div className="bg-white rounded-md p-4">
			<Skeleton className="h-[36px] w-[70%] rounded-md bg-[#F6F6F6]" />
			<ul className="mt-4">
				<li className="cart-summary__between">
					<Skeleton className="h-[22px] w-[60px] rounded-md bg-[#F6F6F6]" />
					<Skeleton className="h-[22px] w-[40px] rounded-md bg-[#F6F6F6]" />
				</li>
				<li className="cart-summary__between">
					<Skeleton className="h-[22px] w-[70px] rounded-md bg-[#F6F6F6]" />
					<Skeleton className="h-[22px] w-[40px] rounded-md bg-[#F6F6F6]" />
				</li>
				<li className="cart-summary__between">
					<Skeleton className="h-[22px] w-[50px] rounded-md bg-[#F6F6F6]" />
					<Skeleton className="h-[22px] w-[30px] rounded-md bg-[#F6F6F6]" />
				</li>
				<li className="cart-summary__between">
					<Skeleton className="h-[24px] w-[50px] rounded-md bg-[#F6F6F6]" />
					<Skeleton className="h-[24px] w-[40px] rounded-md bg-[#F6F6F6]" />
				</li>
			</ul>
		</div>
	);
};

export default CartSummaryScreen;
