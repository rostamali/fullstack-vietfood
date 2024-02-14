import { fetchCheckoutDetails } from '@/lib/actions/order.action';
import EmptyError from '@/components/elements/shared/empty-error';
import Link from 'next/link';
import CheckoutItem from './checkout-item';
import CreateAddress from '@/components/elements/modals/create-address';
import AddressCard from './address-card';
import CartSummray from '../cart-summray';
import CheckoutBtn from './checkout-btn';
import CouponForm from '@/components/elements/forms/coupon-form';

const CheckoutPage = async () => {
	const result = await fetchCheckoutDetails();

	return (
		<div className="checkout-page py-[60px]">
			<div className="container">
				{result ? (
					<div className="grid grid-cols-[1fr,420px] gap-6">
						<div className="space-y-6">
							<div className="bg-white rounded-md">
								<h4 className="heading-4 mb-3 p-4">
									Your Order
								</h4>
								<div className="space-y-2 md:max-h-[372px] overflow-y-auto scrollbar-sm">
									{result.items.map((item, index) => (
										<CheckoutItem data={item} key={index} />
									))}
								</div>
							</div>
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
						</div>
						<div className="space-y-6">
							<div className="bg-white p-4 mb-5 rounded-md">
								<h4 className="heading-4 mb-4">Coupon</h4>
								<CouponForm />
							</div>
							<CartSummray summary={result.summary} />
							<CheckoutBtn cartId={result.cartId} />
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
