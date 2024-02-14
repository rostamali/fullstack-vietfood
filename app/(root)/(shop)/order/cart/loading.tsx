import CartSummaryScreen from '@/components/loading/cart-summary-screen';
import { Skeleton } from '@/components/ui/skeleton';

const CartLoading = () => {
	return (
		<div className="cart-page py-[60px]">
			<div className="container">
				<div className="grid lg:grid-cols-[1fr,330px] max-md:grid-cols-1 gap-[25px]">
					<div>
						<div className="bg-white mb-5 rounded-md p-4">
							<div className="flex sm:items-center justify-between max-sm:flex-col gap-3">
								<Skeleton className="h-[27px] w-[145px] rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[45px] w-[180px] rounded-md bg-[#F6F6F6]" />
							</div>
						</div>
						<div className="md:h-[426px] overflow-y-auto scrollbar-sm">
							{[1, 2, 3].map((item, index) => (
								<div
									className="bg-white border-b-2 border-b-gray-muted py-[30px] px-[30px]"
									key={index}
								>
									<div className="grid md:grid-cols-8 grid-cols-3 gap-[25px] items-center">
										{/* product info */}
										<div className="xl:col-span-3 md:col-span-3 col-span-3 flex gap-[12px] items-center order-1">
											<Skeleton className="h-[80px] w-[80px] rounded-md bg-[#F6F6F6]" />
											<div className="cart-product-info flex-1">
												<Skeleton className="h-[24px] w-[80%] rounded-md bg-[#F6F6F6]" />
												<Skeleton className="h-[20px] w-[45%] rounded-md bg-[#F6F6F6] mt-1" />
											</div>
										</div>
										{/* unit price */}
										<div className="md:text-center order-2 md:col-span-1 col-span-3">
											<div className="flex items-center justify-between">
												<Skeleton className="h-[23px] w-[70px] rounded-md bg-[#F6F6F6] md:hidden" />
												<Skeleton className="h-[23px] w-[50px] rounded-md bg-[#F6F6F6]" />
											</div>
										</div>
										{/* product cart qty */}
										<div className="md:col-span-2 col-span-2 md:order-3 order-5">
											<Skeleton className="h-[45px] w-[120px] rounded-md bg-[#F6F6F6]" />
										</div>
										{/* total price */}
										<div className="md:text-center order-3 md:order-4 md:col-span-1 col-span-3">
											<div className="flex items-center justify-between">
												<Skeleton className="h-[23px] w-[70px] rounded-md bg-[#F6F6F6] md:hidden" />
												<Skeleton className="h-[23px] w-[50px] rounded-md bg-[#F6F6F6]" />
											</div>
										</div>
										{/* shop cart remove btn */}
										<div className="text-right order-5 flex items-center justify-end">
											<Skeleton className="h-[28px] w-[28px] rounded-md bg-[#F6F6F6]" />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="bg-white p-4 mb-5 rounded-md">
							<Skeleton className="h-[36px] w-[70%] rounded-md bg-[#F6F6F6]" />
							<div className="flex items-center justify-between gap-2.5 mt-3">
								<Skeleton className="h-[45px] w-full rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[45px] w-[70px] rounded-md bg-[#F6F6F6]" />
							</div>
						</div>
						<CartSummaryScreen />
						<div className="bg-white h-[50px] flex-center rounded-md mt-4">
							<Skeleton className="h-[20px] w-[70%] rounded-md bg-[#F6F6F6]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartLoading;
