import { StarIcon } from 'lucide-react';

const StarTating = ({ rating }: { rating: number }) => {
	return (
		<div className="flex text-yellow-500">
			{[1, 2, 3, 4, 5].map((item) => (
				<StarIcon key={item} size={17} />
			))}
		</div>
	);
};

export default StarTating;
