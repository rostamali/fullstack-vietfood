import Image from 'next/image';

const CategoryCard = () => {
	return (
		<div className="category-card bg-white p-4 rounded-md group">
			<div className="flex-center rounded h-[150px]">
				<Image
					src="/uploads/files/upload-1707196620409-972.64989653552.png"
					alt=""
					width={400}
					height={400}
					className="object-contain w-[70%]"
				/>
			</div>

			<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green text-center">
				Category
			</h4>
		</div>
	);
};

export default CategoryCard;
