import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import {
	deleteFilesByAdmin,
	fetchFileDetailsbyAdmin,
	fetchFilesOnModal,
} from '@/lib/actions/file.action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFileDetails = (id: string) => {
	return useQuery({
		queryKey: ['fileDetails', id],
		queryFn: async () => await fetchFileDetailsbyAdmin({ id }),
	});
};
export const useDeleteFiles = () => {
	return useMutation({
		mutationFn: async (data: string[]) => {
			return await deleteFilesByAdmin({
				fileId: data,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
export const useModalList = (type: string, page: number) => {
	return useQuery({
		queryKey: ['fileModalLibrary', type, page],
		queryFn: async () =>
			await fetchFilesOnModal({
				type,
				page,
				pageSize: 8,
			}),
	});
};
