import { fetchShopProducts } from '@/lib/actions/product.action';
import HeroBanner from './hero-banner';
import ProductSlider from './product-slider';
import CategorySlider from './category-slider';

export default async function Home() {
	const result = await fetchShopProducts({
		pageSize: 9,
		page: 1,
		query: null,
	});
	return (
		<div className="home-page">
			<HeroBanner />
			{result && result.products.length && (
				<div className="best-products py-[60px]">
					<div className="container">
						<ProductSlider
							data={result.products}
							title={`Best Selling`}
							subtitle={`Discover Our Best Selling Products`}
							navclass={'best-products'}
						/>
					</div>
				</div>
			)}
			{result && result.products.length && (
				<div className="categories">
					<div className="container">
						<CategorySlider
							data={result.products}
							title={`Shop By Categories`}
							subtitle={`Find What You Need, Effortlessly`}
						/>
					</div>
				</div>
			)}
			{result && result.products.length && (
				<div className="new-products py-[60px]">
					<div className="container">
						<ProductSlider
							data={result.products}
							title={`New Arrivals`}
							subtitle={`Be the First to Explore Our Latest Products!`}
							navclass={'new-products'}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
