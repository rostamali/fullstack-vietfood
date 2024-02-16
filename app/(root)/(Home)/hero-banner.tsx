'use client';
import 'swiper/css';
import BannerSlider from '@/components/elements/slider/banner-slider';
import { HeroSlider } from '@/constants';

const HeroBanner = () => {
	return (
		<div className="hero-banner py-[60px]">
			<div className="container">
				<div className="grid lg:grid-cols-[1fr,350px] grid-cols-1 gap-6">
					<div className="overflow-hidden">
						<BannerSlider
							containerClass={
								'border-b-2 border-action-success md:h-[420px] h-[250px]'
							}
							data={HeroSlider}
						/>
					</div>
					<div className="grid lg:grid-cols-1 xm:grid-cols-2 gap-5">
						<div
							className="w-full h-[200px] bg-cover bg-no-repeat bg-center rounded-md"
							style={{
								backgroundImage: `url(/assets/slider/banner-slide-1.png)`,
							}}
						></div>
						<div
							className="w-full h-[200px] bg-cover bg-no-repeat bg-center rounded-md"
							style={{
								backgroundImage: `url(/assets/slider/banner-slide-2.png)`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
