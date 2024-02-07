import { NavbarLinks, TopbarLinks } from '@/constants';
import Link from 'next/link';
import Logo from '../shared/logo';
import {
	AtSign,
	GanttChart,
	Heart,
	PhoneCall,
	ShoppingBag,
	UserRound,
} from 'lucide-react';
import NavSearch from '../filters/nav-search';
import { Separator } from '@/components/ui/separator';
import RootNavbar from '../drawers/root-navbar';

const RootHeader = () => {
	return (
		<header id="site-header">
			<div className="desktop-header max-md:hidden">
				{/* Main Header */}
				<div className="main-header py-4">
					<div className="container">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-[25px]">
								<Logo
									link={'/'}
									logoClass={'w-[120px] h-auto'}
								/>
								<div className="flex-1 max-lg:hidden">
									<NavSearch />
								</div>
							</div>
							{/* Infos */}
							<div className="flex items-center gap-5">
								<Link
									href="/cart"
									className="relative h-[42px] w-[42px] rounded-full bg-primary-green bg-opacity-40 flex-center"
								>
									<ShoppingBag
										size={17}
										className="text-black-dark"
									/>
									<div className="absolute h-[20px] w-[20px] bg-primary-green rounded-full font-poppins text-[13px] flex-center text-white -top-1 -right-1">
										4
									</div>
								</Link>
								<Link
									href="/cart"
									className="relative h-[42px] w-[42px] rounded-full bg-action-warning bg-opacity-40 flex-center"
								>
									<Heart
										size={17}
										className="text-black-dark"
									/>
									<div className="absolute h-[20px] w-[20px] bg-action-warning rounded-full font-poppins text-[13px] flex-center text-white -top-1 -right-1">
										4
									</div>
								</Link>
								<div className="h-[42px] w-[42px] rounded-full bg-action-warning bg-opacity-40 flex-center">
									<UserRound
										size={17}
										className="text-black-dark"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Navbar */}
				<nav>
					<div className="container">
						<div className="flex items-center justify-between h-[70px]">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1">
									<GanttChart
										size={25}
										strokeWidth={3}
										className="text-black-dark"
									/>
									<span className="text-black-dark font-poppins text-[15px] font-semibold">
										Select Category
									</span>
								</div>
								<Separator
									className="bg-gray-muted h-[50px] w-[2px]"
									orientation="vertical"
								/>
								<div className="flex items-center gap-4">
									{NavbarLinks.map((link, index) => (
										<Link
											href={link.url}
											key={index}
											className="text-black-dark font-poppins text-[15px] font-semibold hover:text-action-success"
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>
							<div className="flex-center gap-4 max-lg:hidden">
								<Link
									href=""
									className="text-base-1 flex-center gap-1 !text-primary-green"
								>
									hello@store.com
									<AtSign size={17} />
								</Link>
								<Link
									href=""
									className="text-base-1 flex-center gap-1 !text-action-warning"
								>
									+880-13210
									<PhoneCall size={17} />
								</Link>
							</div>
						</div>
					</div>
				</nav>
			</div>
			<div className="mobile-header py-3 md:hidden">
				<div className="container">
					<div className="flex items-center justify-between">
						<Logo link={'/'} logoClass={'w-[120px] h-auto'} />
						<RootNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};

export default RootHeader;
