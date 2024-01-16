import CreateAddress from '@/components/shared/modals/create-address';
import CartItem from '../cart-item';
import CartSummray from '../cart-summray';

const CheckoutPage = () => {
	return (
		<div className="checkout-page py-[60px]">
			<div className="container">
				<div className="grid lg:grid-cols-[1fr,320px] max-md:grid-cols-1 gap-[25px]">
					<div>
						<div className="bg-white p-4 mb-5 rounded-md">
							<h4 className="heading-4 mb-2">Shipping Address</h4>
							<CreateAddress
								triggerClass={'p-0 text-primary-green h-auto'}
							/>
						</div>
						<div className="bg-white rounded-md h-[435px] overflow-y-auto scrollbar-sm">
							{[1, 2, 3, 4].map((item, index) => (
								<CartItem key={index} />
							))}
						</div>
					</div>
					<div>
						<CartSummray />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
