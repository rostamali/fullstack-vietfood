import { Bell, Mail } from 'lucide-react';
import Profile from '../shared/profile-menu';
import Logo from '../shared/logo';
import MobileNavbar from '../drawers/mobile-navbar';
import DashboardLink from '../shared/dashboard-link';

const AdminHeader = () => {
	return (
		<header className="admin-header bg-white">
			<div className="dashboard-container">
				<div className="flex items-center justify-between py-5">
					<div className="dashboard-title">
						<h4 className="heading-4 sm:block max-md:hidden">
							Food Menu
						</h4>
						<div className="w-0 h-0 max-sm:w-auto max-sm:h-auto">
							<Logo
								link={'/'}
								logoClass={
									'sm:hidden max-md:w-[85px] max-md:h-[42px] w-[140px] h-[65px]'
								}
							/>
						</div>
					</div>
					<div className="max-lg:hidden">Global Search</div>
					<div className="flex-center gap-[10px]">
						<div className="circle-icon-wrap max-md:hidden">
							<Mail className="circle-icon" />
						</div>
						<div className="circle-icon-wrap max-md:hidden">
							<Bell className="circle-icon" />
						</div>
						<Profile />
						<MobileNavbar
							trigger={undefined}
							content={
								<>
									<Logo
										link={'/'}
										logoClass={'w-[100px] h-[45px]'}
									/>
									<DashboardLink type={'ADMIN'} />
								</>
							}
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default AdminHeader;
