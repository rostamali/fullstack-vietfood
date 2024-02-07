import CreateAddress from '@/components/elements/modals/create-address';
import CartSummray from '../cart-summray';
import { fetchCheckoutDetails } from '@/lib/actions/order.action';
import EmptyError from '@/components/elements/shared/empty-error';
import Link from 'next/link';
import AddressCard from './address-card';
import CheckoutItem from './checkout-item';
import { Button } from '@/components/ui/button';
import CheckoutForm from './checkout-form';

const CheckoutPage = async () => {
	const result = await fetchCheckoutDetails();

	return (
		<div className="checkout-page py-[60px]">
			<div className="container">
				{result ? (
					<div className="grid lg:grid-cols-[1fr,330px] max-md:grid-cols-1 gap-[25px]">
						<div>
							<div className="bg-white p-4 mb-5 rounded-md">
								<h4 className="heading-4 mb-3">
									Shipping Address
								</h4>
								<AddressCard
									address={result.addressList || []}
								/>
								<div className="mt-2">
									<CreateAddress
										triggerClass={
											'p-0 text-primary-green h-auto'
										}
									/>
								</div>
							</div>
							<div className="bg-white p-4 mb-5 rounded-md">
								<h4 className="heading-4 mb-3">
									Payment Method
								</h4>

								<CheckoutForm cartId={result.cartId} />
							</div>
						</div>
						<div>
							<div className="bg-white p-4 rounded-md mb-6 space-y-4">
								<h4 className="heading-4">Your Order</h4>
								<div className="space-y-2">
									{result.items.map((item, index) => (
										<CheckoutItem data={item} key={index} />
									))}
								</div>
							</div>

							<CartSummray summary={result.summary} />

							<Button
								type="submit"
								form="checkout-form"
								className="btn-primary-lg w-full mt-6"
							>
								Confirm Order
							</Button>
						</div>
					</div>
				) : (
					<EmptyError
						contentClass={
							'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
						}
						title={'Your cart is empty'}
						description={`Oops! It seems you haven't added any items to your cart yet.`}
						Links={
							<Link
								href="/shop"
								className="btn-navlink btn-navlink-active !w-auto"
							>
								Continue Shopping
							</Link>
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CheckoutPage;
