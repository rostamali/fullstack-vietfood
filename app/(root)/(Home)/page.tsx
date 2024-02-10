import HeroBanner from './hero-banner';
import ProductSlider from './product-slider';
import CategorySlider from './category-slider';
import { StoreFeature } from '@/constants';
import { fetchHomepageDetails } from '@/lib/actions/shop.action';

export default async function Home() {
	const result = await fetchHomepageDetails();

	return (
		<div className="home-page">
			<HeroBanner />
			{result && result.bestSell.length > 0 && (
				<div className="best-products pb-[60px]">
					<div className="container">
						<ProductSlider
							data={result.bestSell}
							title={`Best Selling`}
							subtitle={`Discover Our Best Selling Products`}
							navclass={'best-products'}
						/>
					</div>
				</div>
			)}
			{result && result.categories.length > 0 && (
				<div className="categories">
					<div className="container">
						<CategorySlider
							data={result.categories}
							title={`Shop By Categories`}
							subtitle={`Find What You Need, Effortlessly`}
						/>
					</div>
				</div>
			)}
			{result && result.newArrival.length > 0 && (
				<div className="new-products py-[60px]">
					<div className="container">
						<ProductSlider
							data={result.newArrival}
							title={`New Arrivals`}
							subtitle={`Be the First to Explore Our Latest Products!`}
							navclass={'new-products'}
						/>
					</div>
				</div>
			)}
			<div className="store-feature pb-[60px]">
				<div className="container">
					<div className="grid lg:grid-cols-4 xm:grid-cols-2 grid-cols-1 gap-5">
						{StoreFeature.map((item, index) => (
							<div
								className="bg-white px-4 py-5 flex-center flex-col rounded-md space-y-2 text-center"
								key={index}
							>
								<div className="h-[55px] w-[55px] bg-action-success flex-center rounded-full text-white">
									<item.icon size={25} />
								</div>
								<h6 className="heading-6 !font-medium">
									{item.name}
								</h6>
								<p className="text-base-2">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
