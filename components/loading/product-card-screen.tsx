import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductCardScreen = () => {
	return (
		<div className="product-card overflow-hidden group bg-white p-4 rounded">
			<Skeleton className="flex-center rounded h-[260px] bg-[#F6F6F6]" />
			<div className="mt-3">
				<Skeleton className="w-full h-[24px] rounded-md bg-[#F6F6F6]" />
				<Skeleton className="w-[120px] h-[20px] rounded-md bg-[#F6F6F6] mt-1" />
			</div>
		</div>
	);
};

export default ProductCardScreen;
