import { FC } from 'react';
type FormaterProps = {
	inventory: {
		regularPrice: number | null;
		salePrice: number | null;
	} | null;
	saleClass?: string;
	regularClass?: string;
};

const PriceFormat: FC<FormaterProps> = ({
	inventory,
	saleClass,
	regularClass,
}) => {
	return (
		<div className="product-price mt-1">
			{inventory && (
				<div className="flex items-center gap-1.5">
					{inventory?.salePrice && (
						<span
							className={`font-poppins font-medium text-primary-green ${saleClass}`}
						>
							${inventory?.salePrice?.toFixed(2)}
						</span>
					)}
					{inventory?.regularPrice && (
						<span
							className={`font-poppins line-through text-primary-gray ${regularClass}`}
						>
							${inventory?.regularPrice?.toFixed(2)}
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default PriceFormat;
