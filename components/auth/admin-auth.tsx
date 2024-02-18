import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const AdminAuth = async ({ children }: { children: React.ReactNode }) => {
	const isAuth = await isAuthenticated();
	if (!isAuth || isAuth.role !== 'ADMIN')
		redirect(`/auth/login?redirect=/admin`);

	return <>{children}</>;
};

export default AdminAuth;
