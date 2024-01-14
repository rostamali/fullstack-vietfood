import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchModalFiles } from '../actions/file.action';

export const useLoadModalFiles = () => {
	return useInfiniteQuery({
		queryKey: ['modalFilesList'],
		queryFn: async ({ pageParam }) => await fetchModalFiles({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage =
				lastPage.length === 8 ? allPages.length * 8 : undefined;
			return nextPage;
		},
	});
};
