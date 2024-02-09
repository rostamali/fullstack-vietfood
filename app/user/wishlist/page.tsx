import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import PriceFormat from '@/components/elements/shared/price-format';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Wishllist = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Wishlist'}
					links={[]}
					params={null}
				/>
				<Link href="/shop">
					<Button className="btn-primary-lg">Add To Wishlist</Button>
				</Link>
			</div>
			<div className="wishlist">
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-5 lg:gap-2 gap-5">
					{[1, 2, 3, 4, 5, 6].map((item, index) => (
						<div className="product-card overflow-hidden group bg-white p-4 rounded">
							<div
								className={`flex-center rounded h-[260px] bg-[#F6F6F6]`}
								key={index}
							>
								<Image
									src={`/uploads/files/upload-1707453426544-369.94372964481596.png`}
									alt={''}
									width={480}
									height={500}
									className="object-contain w-[70%]"
									style={{
										aspectRatio: '3/3',
									}}
								/>
							</div>
							<div className="space-y-2">
								<Link
									href={`/product/fsh`}
									className="mt-3 block"
								>
									<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green">
										Digital smart watch
									</h4>
									<PriceFormat
										regularClass="text-[14px]"
										saleClass="text-[18px]"
										inventory={{
											regularPrice: 42,
											salePrice: 36,
										}}
									/>
								</Link>
								<div className="flex items-center gap-2 flex-col">
									<Button className="btn-primary-sm w-full">
										Add To Cart
									</Button>
									<Button className="btn-ghost-sm w-full">
										Remove Item
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Wishllist;
