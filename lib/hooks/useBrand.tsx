import { useQuery } from '@tanstack/react-query';
import { fetchBrandList } from '../actions/brand.action';

export const useBrandList = () => {
	return useQuery({
		queryKey: ['brandSelectList'],
		queryFn: async () => await fetchBrandList(),
	});
};
