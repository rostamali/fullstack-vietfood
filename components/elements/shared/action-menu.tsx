import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { MoreHorizontal } from 'lucide-react';
import { FC } from 'react';
type ActionMenuProps = {
	content: React.ReactNode;
};

const ActionMenu: FC<ActionMenuProps> = ({ content }) => {
	return (
		<Menubar className="px-0 border-none bg-transparent">
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">
					<MoreHorizontal />
				</MenubarTrigger>
				<MenubarContent className="absolute -right-[40px] bg-white min-w-[140px]">
					{content}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default ActionMenu;
