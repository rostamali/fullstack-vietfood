import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { ProductFormSchema } from '../helpers/form-validation';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';
import { createProductByAdmin } from '../actions/product.action';
import { useRouter } from 'next/navigation';

export const useCreateProduct = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
			return await createProductByAdmin({
				data,
			});
		},
		onSuccess: (result) => {
			if (result.id) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push(`/admin/product/edit?product_id=${result.id}`);
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
