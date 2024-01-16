import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const RootNavbar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="btn-primary-sm p-0 w-[45px]">
					<Menu size={25} strokeWidth={2} className="text-white" />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className={`bg-white xm:w-[280px] w-[260px]`}
			>
				Mobile Navbar
			</SheetContent>
		</Sheet>
	);
};

export default RootNavbar;
