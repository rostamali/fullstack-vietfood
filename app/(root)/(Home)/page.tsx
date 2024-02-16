import HeroBanner from './hero-banner';
import ProductSlider from './product-slider';
import CategorySlider from './category-slider';
import { StoreFeature } from '@/constants';
import { fetchHomepageDetails } from '@/lib/actions/shop.action';
import type { Metadata } from 'next';
import ogImage1 from '../../../public/assets/seo/beef.png';

export const metadata: Metadata = {
	title: `Vietfood - Your Ultimate Food Wholesaler In New Zealand`,
	description: `Vietfood - Your premier food wholesaler in New Zealand, providing a diverse range of fresh, frozen, and pantry essentials, along with beverages and consumables. Catering to the needs of food enthusiasts and businesses nationwide with quality products and exceptional service.`,
	openGraph: {
		title: `Vietfood - Your Ultimate Food Wholesaler In New Zealand`,
		description: `Vietfood - Your go-to food wholesaler in New Zealand. We supply fresh, frozen, and pantry essentials along with beverages and consumables. Quality products, exceptional service.`,
		url: process.env.HOST,
		siteName: `Vietfood`,
		images: [
			{
				url: ogImage1.src,
				width: 1260,
				height: 628,
			},
		],
	},
};

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
