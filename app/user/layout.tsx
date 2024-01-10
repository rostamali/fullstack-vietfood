import UserHeader from '@/components/shared/headers/UserHeader';
import DashboardLink from '@/components/shared/ui/dashboard-link';
import Logo from '@/components/shared/ui/logo';

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-light relative w-full">
			<div className="flex-1 md:grid grid-cols-[266px_minmax(0,1fr)] max-lg:grid-cols-[100px_minmax(0,1fr)]">
				<section className="bg-white sticky left-0 top-0 px-6 pt-5 flex h-screen flex-col overflow-y-auto max-md:hidden">
					<Logo
						link={'/'}
						logoClass={
							'max-lg:w-[50px] max-lg:h-[45px] w-[140px] h-[65px]'
						}
					/>
					<DashboardLink type={'USER'} />
				</section>
				<section>
					<UserHeader />
					<main className="dashboard-container py-16">
						{children}
					</main>
				</section>
			</div>
		</div>
	);
}
