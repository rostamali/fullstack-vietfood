'use client';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from '@/components/elements/shared/category-card';
type SliderProps = {
	data: CategoryCardProps[];
	title: string;
	subtitle: string;
};

const CategorySlider: React.FC<SliderProps> = ({ data, title, subtitle }) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between gap-4">
				<div className="space-y-2">
					<h3 className="heading-3">{title}</h3>
					<p className="text-base-1">{subtitle}</p>
				</div>
				<div className="flex items-center gap-2 max-xm:flex-col">
					<button className={`product-arrow category-arrow-left`}>
						<ChevronLeft />
					</button>
					<button className={`product-arrow category-arrow-right`}>
						<ChevronRight />
					</button>
				</div>
			</div>
			<div className="slider-wrapper">
				<Swiper
					spaceBetween={20}
					navigation={{
						nextEl: '.category-arrow-left',
						prevEl: '.category-arrow-right',
					}}
					modules={[Navigation]}
					className="product-slider"
					breakpoints={{
						200: {
							slidesPerView: 1,
						},
						550: { slidesPerView: 2 },
						1020: {
							slidesPerView: 3,
						},
						1100: {
							slidesPerView: 4,
						},
					}}
				>
					{data.map((item, index) => (
						<SwiperSlide key={index}>
							<CategoryCard item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default CategorySlider;
