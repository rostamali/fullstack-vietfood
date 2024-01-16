import CouponForm from '@/components/shared/forms/coupon-form';
import CartItem from '../cart-item';
import CartSummray from '../cart-summray';
import Link from 'next/link';

const CartPage = () => {
	return (
		<div className="cart-page py-[60px]">
			<div className="container">
				<div className="grid lg:grid-cols-[1fr,320px] max-md:grid-cols-1 gap-[25px]">
					<div>
						<div className="bg-white mb-5 rounded-md p-4">
							<div className="flex sm:items-center justify-between max-sm:flex-col gap-3">
								<h5 className="heading-5">Shopping Cart: 4</h5>
								<Link href="" className="">
									<span className="badge-success">
										Continue Shopping
									</span>
								</Link>
							</div>
						</div>
						<div className="bg-white rounded-md h-[435px] overflow-y-auto scrollbar-sm">
							{[1, 2, 3, 4].map((item, index) => (
								<CartItem key={index} />
							))}
						</div>
					</div>
					<div>
						<div className="bg-white p-4 mb-5 rounded-md">
							<h4 className="heading-4 mb-4">Coupon</h4>
							<CouponForm />
						</div>
						<CartSummray />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
