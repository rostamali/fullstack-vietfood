import Image from 'next/image';
import Link from 'next/link';
type CardProps = {
	item: CategoryCardProps;
};

const CategoryCard: React.FC<CardProps> = ({ item }) => {
	return (
		<Link
			href={`/shop/category/${item.slug}`}
			className="category-card bg-white p-4 rounded-md group block space-y-3"
		>
			<div className={`flex-center bg-[#F6F6F6] rounded py-3`}>
				<Image
					src={
						item.thumbnail
							? `/uploads/files/${item.thumbnail?.fileName}`
							: `/assets/placeholder.png`
					}
					alt={item.name}
					width={400}
					height={400}
					className="object-contain w-[70%]"
					style={{
						aspectRatio: '3/2',
					}}
				/>
			</div>
			<h4 className="lg:text-[16px] sm:text-[13px] xm:text-[15px] text-[13px] font-medium text-black-dark duration-100 group-hover:text-primary-green text-center">
				{item.name}
			</h4>
		</Link>
	);
};

export default CategoryCard;
