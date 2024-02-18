import AdminHeader from '@/components/elements/headers/admin-header';
import Logo from '@/components/elements/shared/logo';
import DashboardLink from '@/components/elements/shared/dashboard-link';
import AdminAuth from '@/components/auth/admin-auth';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AdminAuth>
			<div className="bg-gray-light relative w-full">
				<div className="flex-1 md:grid grid-cols-[266px_minmax(0,1fr)] max-lg:grid-cols-[100px_minmax(0,1fr)]">
					<section className="bg-white sticky left-0 top-0 px-6 pt-5 flex h-screen flex-col overflow-y-auto max-md:hidden">
						<Logo
							link={'/'}
							logoClass={
								'max-lg:w-[50px] max-lg:h-[45px] w-[140px] h-[65px]'
							}
						/>
						<DashboardLink type={'ADMIN'} />
					</section>
					<section>
						<AdminHeader />
						<main className="dashboard-container py-16">
							{children}
						</main>
					</section>
				</div>
			</div>
		</AdminAuth>
	);
}
