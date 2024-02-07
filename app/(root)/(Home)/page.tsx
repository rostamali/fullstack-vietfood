'use client';
import { toast } from 'sonner';

import {
	ToastError,
	ToastSuccess,
	ToastLoading,
} from '../../../components/elements/shared/custom-toast';
import { Button } from '@/components/ui/button';
export default function Home() {
	const showLoad = (message: string) => {
		const promise = () =>
			new Promise((resolve) =>
				setTimeout(() => resolve({ message: 'Sonner' }), 2000),
			);
		toast.custom((t) => <ToastSuccess toastNumber={t} content={message} />);
	};

	return (
		<div className="min-h-screen flex flex-col p-20 gap-[30px]">
			<div className="container">
				<ToastSuccess
					toastNumber={'1'}
					content={'Update member status.'}
				/>
				<ToastError
					toastNumber={'1'}
					content={'Update member status.'}
				/>
				<ToastLoading
					toastNumber={'1'}
					content={'Update member status.'}
				/>
				<Button
					className="btn-primary-lg"
					onClick={() => showLoad(`Hello Everyone`)}
				>
					Show Toast
				</Button>
			</div>
		</div>
	);
}
