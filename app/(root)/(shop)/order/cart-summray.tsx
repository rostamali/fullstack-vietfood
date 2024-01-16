import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CartSummray = () => {
	return (
		<div className="bg-white rounded-md p-4">
			<h4 className="heading-4">Cart Summary</h4>
			<ul className="my-4">
				<li className="cart-summary__between">
					<span className="cart-summary__label">Subtotal</span>
					<span className="cart-summary__value">$800.00</span>
				</li>
				<li className="cart-summary__between">
					<span className="cart-summary__label">Shipping</span>
					<span className="cart-summary__value">$10.00</span>
				</li>
				<li className="cart-summary__between">
					<span className="cart-summary__label">Tax</span>
					<span className="cart-summary__value">5%</span>
				</li>
				<li className="cart-summary__between">
					<span className="heading-6 !font-semibold">Total</span>
					<span className="heading-6">$800.00</span>
				</li>
			</ul>
			<Link href="/order/checkout">
				<Button className="btn-primary-lg w-full">
					Proceed to Checkout
				</Button>
			</Link>
		</div>
	);
};

export default CartSummray;
