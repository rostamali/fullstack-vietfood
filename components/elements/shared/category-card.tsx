import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = () => {
	return (
		<Link
			href="/categories"
			className="category-card bg-white p-4 rounded-md group block"
		>
			<div className="flex-center">
				<Image
					src="/assets/category.png"
					alt=""
					width={400}
					height={400}
					className="object-contain w-[70%]"
					style={{
						aspectRatio: '3/2',
					}}
				/>
			</div>

			<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green text-center">
				Category
			</h4>
		</Link>
	);
};

export default CategoryCard;
