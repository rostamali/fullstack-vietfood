import { FC } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
type MobileNavbarProps = {
	trigger: React.ReactNode;
	content: React.ReactNode;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ trigger, content }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{trigger ? (
					trigger
				) : (
					<Button className="text-[28px] md:hidden block p-0">
						<Menu strokeWidth={1.25} />
					</Button>
				)}
			</SheetTrigger>
			<SheetContent
				side="left"
				className={`bg-white xm:w-[280px] w-[260px] data-[state=open]:bg-secondary`}
			>
				{content}
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavbar;
