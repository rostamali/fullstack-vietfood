import {
	ToastError,
	ToastSuccess,
} from '@/components/elements/shared/custom-toast';
import {
	deleteFilesByAdmin,
	fetchFileDetailsbyAdmin,
	compressFileByAdmin,
	uploadFilesByAdmin,
} from '@/lib/actions/file.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { CompressFormSchema } from '../helpers/form-validation';

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
export const useUploadFiles = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await uploadFilesByAdmin(data);
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
export const useCompressFile = (fileId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			id: string;
			file: z.infer<typeof CompressFormSchema>;
		}) => {
			return await compressFileByAdmin({
				id: data.id,
				file: data.file,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({
					queryKey: ['fileDetails', fileId],
				});
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
