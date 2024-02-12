import DashboardPageTitle from '@/components/elements/shared/db-page-title';
import EmptyError from '@/components/elements/shared/empty-error';
import { Button } from '@/components/ui/button';
import { fetchWishlistProducts } from '@/lib/actions/shop.action';
import Link from 'next/link';
import WishlistCard from './wishlist-card';

const Wishllist = async () => {
	const result = await fetchWishlistProducts();

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
				{result && result.products.length ? (
					<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-5 lg:gap-2 gap-5">
						{result.products.map((item, index) => (
							<WishlistCard item={item} key={index} />
						))}
					</div>
				) : (
					<EmptyError
						contentClass={
							'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
						}
						title={'Your Wishlist is Empty'}
						description={`Start adding products to your wishlist to keep track of your favorite items and receive updates on their availability and price changes.`}
						Links={null}
					/>
				)}
			</div>
		</div>
	);
};

export default Wishllist;
