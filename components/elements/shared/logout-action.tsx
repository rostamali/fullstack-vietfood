'use client';
import { logoutUser } from '@/lib/actions/auth.action';
import { useState } from 'react';
import { toast } from 'sonner';
import { ToastError } from './custom-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
type LogoutType = {
	trigger: React.ReactNode;
	btnClass: string;
};

const LogoutAction = ({ trigger, btnClass }: LogoutType) => {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const handleLogout = async () => {
		setIsPending(true);
		try {
			const result = await logoutUser();
			setIsPending(false);
			if (result.success) {
				router.push('/');
			} else {
				toast.custom((t) => (
					<ToastError
						toastNumber={t}
						content={`Logout action failed`}
					/>
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Logout action failed`} />
			));
		}
	};

	return (
		<Button
			onClick={handleLogout}
			className={`p-0 h-auto flex ${btnClass}`}
			disabled={isPending}
		>
			{trigger}
		</Button>
	);
};

export default LogoutAction;
