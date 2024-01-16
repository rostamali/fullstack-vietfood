import { FC } from 'react';
type FormaterProps = {
	inventory: {
		regularPrice: number | null;
		salePrice: number | null;
	} | null;
};

const PriceFormat: FC<FormaterProps> = ({ inventory }) => {
	return (
		<div className="product-price mt-1">
			{inventory && (
				<div className="flex items-center gap-1 text-base-1">
					{inventory?.regularPrice && (
						<span className="line-through text-primary-gray">
							${inventory?.regularPrice?.toFixed(2)}
						</span>
					)}
					{inventory?.salePrice && (
						<span className="font-medium">
							${inventory?.salePrice?.toFixed(2)}
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default PriceFormat;
