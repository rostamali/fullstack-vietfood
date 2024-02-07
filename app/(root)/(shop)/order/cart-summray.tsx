type SummrayProps = {
	summary: {
		subtotal: number;
		shippingCost: number;
		taxCost: number;
		total: number;
	};
};

const CartSummray: React.FC<SummrayProps> = ({ summary }) => {
	return (
		<div className="bg-white rounded-md p-4">
			<h4 className="heading-4">Cart Summary</h4>
			<ul className="mt-4">
				<li className="cart-summary__between">
					<span className="cart-summary__label">Subtotal</span>
					<span className="cart-summary__value">
						${summary.subtotal.toFixed(2)}
					</span>
				</li>
				<li className="cart-summary__between">
					<span className="cart-summary__label">Shipping</span>
					<span className="cart-summary__value">
						${summary.shippingCost.toFixed(2)}
					</span>
				</li>
				<li className="cart-summary__between">
					<span className="cart-summary__label">Tax</span>
					<span className="cart-summary__value">
						{summary.taxCost}%
					</span>
				</li>
				<li className="cart-summary__between">
					<span className="heading-6 !font-semibold">Total</span>
					<span className="heading-6">
						${summary.total.toFixed(2)}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default CartSummray;
