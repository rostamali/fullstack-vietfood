import CartSummaryScreen from '@/components/loading/cart-summary-screen';
import { Skeleton } from '@/components/ui/skeleton';

const CheckoutLoading = () => {
	return (
		<div className="py-[60px]">
			<div className="container">
				<div className="grid xl:grid-cols-[1fr,420px] lg:grid-cols-[1fr,300px] grid-cols-1 gap-6">
					<div className="space-y-6">
						<div className="bg-white rounded-md">
							<div className="p-4">
								<Skeleton className="h-[30px] w-[145px] rounded-md bg-[#F6F6F6]" />
							</div>
							<div className="space-y-2">
								{[1, 2].map((item, index) => (
									<div
										className="bg-white border-b-2 border-b-gray-muted py-[18px] px-[20px]"
										key={index}
									>
										<div className="grid sm:grid-cols-[80px,1fr,100px] grid-cols-[80px,1fr] gap-3.5 items-center">
											<Skeleton className="h-[80px] w-[80px] rounded-md bg-[#F6F6F6]" />
											<div className="space-y-1.5">
												<Skeleton className="h-[24px] w-[60%] rounded-md bg-[#F6F6F6]" />
												<div className="flex items-center gap-4">
													<Skeleton className="h-[22px] w-[80px] rounded-md bg-[#F6F6F6]" />
													<Skeleton className="h-[22px] w-[80px] rounded-md bg-[#F6F6F6]" />
												</div>
											</div>
											<div className="max-sm:col-span-2">
												<Skeleton className="h-[36px] w-[80px] rounded-md bg-[#F6F6F6]" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="bg-white p-4 mb-5 rounded-md">
							<Skeleton className="h-[36px] w-[70%] rounded-md bg-[#F6F6F6]" />
							<div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
								{[1, 2].map((item, index) => (
									<div
										className="grid grid-cols-[30px,1fr] p-5"
										key={index}
									>
										<Skeleton className="h-[20px] w-[20px] rounded-md bg-[#F6F6F6]" />
										<div className="space-y-2">
											<Skeleton className="h-[20px] w-[80%] rounded-md bg-[#F6F6F6]" />
											<Skeleton className="h-[20px] w-[70%] rounded-md bg-[#F6F6F6]" />
											<div className="space-y-[2px]">
												<Skeleton className="h-[10px] w-[100%] rounded-md bg-[#F6F6F6]" />
												<Skeleton className="h-[10px] w-[70%] rounded-md bg-[#F6F6F6]" />
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="mt-2">
								<Skeleton className="h-[20px] w-[100px] rounded-md bg-[#F6F6F6]" />
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="bg-white p-4 mb-5 rounded-md">
							<Skeleton className="h-[36px] w-[70%] rounded-md bg-[#F6F6F6]" />
							<div className="flex items-center justify-between gap-2.5 mt-3">
								<Skeleton className="h-[45px] w-full rounded-md bg-[#F6F6F6]" />
								<Skeleton className="h-[45px] w-[70px] rounded-md bg-[#F6F6F6]" />
							</div>
						</div>
						<CartSummaryScreen />
						<div className="bg-white h-[50px] flex-center rounded-md">
							<Skeleton className="h-[20px] w-[120px] rounded-md bg-[#F6F6F6]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutLoading;
