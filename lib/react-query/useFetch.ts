import { useQuery } from '@tanstack/react-query';
import { fetchCategoryList } from '../actions/category.action';

export const useFetchUsersByAdmin = () => {
	return useQuery({
		queryKey: ['categoriesList'],
		queryFn: async () => await fetchCategoryList(),
	});
};
