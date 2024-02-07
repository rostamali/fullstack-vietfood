import { Button } from '@/components/ui/button';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { fetchProfileMenu } from '@/lib/actions/auth.action';
import { UserRoleFormat } from '@/lib/helpers/formater';
import Image from 'next/image';
import LogoutAction from './logout-action';

const ProfileMenu = async () => {
	const result = await fetchProfileMenu();
	return (
		<Menubar className="px-0 border-none bg-transparent">
			{result && (
				<MenubarMenu>
					<MenubarTrigger asChild>
						<Button className="flex items-center justify-center gap-[10px] cursor-pointer !p-0">
							<Image
								src={
									result.avatar
										? `/uploads/avatar/${result.avatar.url}`
										: '/assets/placeholder.svg'
								}
								alt={'Placeholder'}
								width={100}
								height={100}
								className="h-[45px] w-[45px] rounded-full"
							/>
							<div className="flex flex-col items-start max-md:hidden">
								<h5 className="heading-6">
									{result.firstName}
								</h5>
								<span className="font-poppins text-[12px] font-normal text-black-dark">
									{UserRoleFormat[result.role]}
								</span>
							</div>
						</Button>
					</MenubarTrigger>
					<MenubarContent className="absolute md:left-[0px] -right-12 min-w-[150px] bg-white top-4">
						<MenubarItem className="menubar-item">
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem className="menubar-item">
							New Window
						</MenubarItem>
						<MenubarItem className="menubar-item">
							Share
						</MenubarItem>

						<LogoutAction
							trigger={
								<MenubarItem className="menubar-item w-full cursor-pointer">
									Logout
								</MenubarItem>
							}
							btnClass={'w-full'}
						/>
					</MenubarContent>
				</MenubarMenu>
			)}
		</Menubar>
	);
};

export default ProfileMenu;
