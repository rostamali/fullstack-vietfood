import { useMutation, useQuery } from '@tanstack/react-query';
import {
	classListForFlatMethods,
	createShipClassByAdmin,
	createShipZoneByAdmin,
	deleteShipClassByAdmin,
	deleteShipZoneByAdmin,
	updateShipClassByAdmin,
	updateShipZoneByAdmin,
} from '../actions/ship.action';
import { toast } from 'sonner';
import * as z from 'zod';
import { ShipClassSchema, ShipFormSchema } from '../helpers/form-validation';
import { ToastError, ToastSuccess } from '@/components/shared/ui/custom-toast';

// Shipping classes
export const useMethodClassList = () => {
	return useQuery({
		queryKey: ['methodClassList'],
		queryFn: async () => await classListForFlatMethods(),
	});
};
export const useCreateShipClass = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ShipClassSchema>) => {
			return await createShipClassByAdmin(data);
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
export const useUpdateShipClass = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof ShipClassSchema>;
		}) => {
			return await updateShipClassByAdmin({
				id: data.id,
				data: data.values,
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
export const useDeleteShipClass = () => {
	return useMutation({
		mutationFn: async (data: string[]) => {
			return await deleteShipClassByAdmin({
				classIds: data,
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

// Shipping zones
export const useCreateShipZone = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ShipFormSchema>) => {
			return await createShipZoneByAdmin(data);
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
export const useUpdateShipZone = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof ShipFormSchema>;
		}) => {
			return await updateShipZoneByAdmin({
				id: data.id,
				data: data.values,
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
export const useDeleteShipZone = () => {
	return useMutation({
		mutationFn: async (data: { id: string }) => {
			return await deleteShipZoneByAdmin({
				id: data.id,
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
