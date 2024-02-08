'use client';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const HeroBanner = () => {
	return (
		<div className="hero-banner pt-[60px]">
			<div className="container">
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-[70%] w-full">
						<Swiper
							pagination={{
								clickable: true,
								clickableClass: 'hero-slider-dots',
							}}
							modules={[Pagination]}
							className="hero-slider relative"
						>
							{[1, 2, 3].map((item, index) => (
								<SwiperSlide key={index}>
									<div
										className="border-b-2 border-action-success h-[420px] bg-cover bg-no-repeat bg-center rounded-md"
										style={{
											backgroundImage: `url(/assets/banner-slide-${item}.png)`,
										}}
									></div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="w-full">
						<div className="grid lg:grid-cols-1 xm:grid-cols-2 gap-5">
							<div
								className="w-full h-[200px] bg-cover bg-no-repeat bg-center rounded-md"
								style={{
									backgroundImage: `url(/assets/banner-slide-1.png)`,
								}}
							></div>
							<div
								className="w-full h-[200px] bg-cover bg-no-repeat bg-center rounded-md"
								style={{
									backgroundImage: `url(/assets/banner-slide-2.png)`,
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
