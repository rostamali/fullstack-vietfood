import CategoryCard from '@/components/elements/shared/category-card';

const ProductCategories = () => {
	return (
		<div className="categories py-[60px]">
			<div className="container">
				<div className="grid grid-cols-4 gap-5">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
						<CategoryCard key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductCategories;
