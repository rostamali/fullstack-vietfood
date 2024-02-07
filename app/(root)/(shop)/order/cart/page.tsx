import CouponForm from '@/components/elements/forms/coupon-form';
import CartItem from './cart-item';
import CartSummray from '../cart-summray';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchCartDetails } from '@/lib/actions/order.action';
import EmptyError from '@/components/elements/shared/empty-error';

const CartPage = async () => {
	const result = await fetchCartDetails();

	return (
		<div className="cart-page py-[60px]">
			<div className="container">
				{result ? (
					<div className="grid lg:grid-cols-[1fr,330px] max-md:grid-cols-1 gap-[25px]">
						<div>
							<div className="bg-white mb-5 rounded-md p-4">
								<div className="flex sm:items-center justify-between max-sm:flex-col gap-3">
									<h5 className="heading-5">
										Shopping Cart: 4
									</h5>
									<Link href="" className="">
										<Button className="btn-ghost-sm">
											Continue Shopping
										</Button>
									</Link>
								</div>
							</div>
							<div className="h-[435px] overflow-y-auto scrollbar-sm">
								{result.items.map((item, index) => (
									<div
										className="bg-white first:rounded-t-md last:rounded-b-md overflow-hidden"
										key={index}
									>
										<CartItem data={item} />
									</div>
								))}
							</div>
						</div>
						<div>
							<div className="bg-white p-4 mb-5 rounded-md">
								<h4 className="heading-4 mb-4">Coupon</h4>
								<CouponForm />
							</div>
							<CartSummray summary={result.summary} />
							<Link href="/order/checkout">
								<Button className="btn-primary-lg w-full mt-4">
									Proceed to Checkout
								</Button>
							</Link>
						</div>
					</div>
				) : (
					<EmptyError
						contentClass={
							'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
						}
						title={'No items in your cart'}
						description={`Oops! Your cart is empty. It seems you haven't added any items yet.`}
						Links={
							<Link
								href="/shop"
								className="btn-navlink btn-navlink-active !w-auto"
							>
								Go Shopping
							</Link>
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CartPage;
