import { fetchFileDetailsbyAdmin } from '@/lib/actions/file.action';
import { useQuery } from '@tanstack/react-query';

export const useFileDetails = (id: string) => {
	return useQuery({
		queryKey: ['categoriesList', id],
		queryFn: async () => await fetchFileDetailsbyAdmin({ id }),
	});
};
