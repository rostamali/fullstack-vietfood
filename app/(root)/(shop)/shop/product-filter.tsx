import LocalSearch from '@/components/elements/filters/local-search';
import { Checkbox } from '@/components/ui/checkbox';
import { BrandList } from '@/constants';

const ProductFilter = () => {
	return (
		<div className="bg-white p-4 rounded-md flex flex-col gap-5">
			<div>
				<h5 className="heading-5 mb-3">Filter By</h5>
				<LocalSearch
					route={'/shop'}
					iconPosition={'left'}
					placeholder={'Search by name'}
					containerClass={
						'bg-white border border-primary-gray border-opacity-15 col-span-3'
					}
					inputClass={'h-[50px]'}
					iconClass={''}
				/>
			</div>
			<div>
				<h5 className="heading-5 mb-3">Categories</h5>
				<ul className="flex flex-col gap-2">
					{BrandList.map((item, index) => (
						<li key={index} className="flex items-center gap-3">
							<Checkbox className="checkbox-sm" />
							<span className="text-base-2">{item.label}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProductFilter;
