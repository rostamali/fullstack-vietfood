'use client';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
type SliderProps = {
	containerClass: string;
	data: {
		url: string;
	}[];
};

const BannerSlider: React.FC<SliderProps> = ({ containerClass, data }) => {
	return (
		<Swiper
			pagination={{
				clickable: true,
				clickableClass: 'hero-slider-dots',
			}}
			modules={[Pagination]}
			className="hero-slider relative"
		>
			{data.map((item, index) => (
				<SwiperSlide key={index}>
					<div
						className={`bg-cover bg-no-repeat bg-center rounded-md ${
							containerClass ? containerClass : 'h-[420px]'
						}`}
						style={{
							backgroundImage: `url(${item.url})`,
						}}
					></div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BannerSlider;
