import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Logo from '../shared/logo';
import { RootMobileNavs } from '@/constants';
import RootMobileNavlink from '../shared/root-mobile-navlink';
import { fetchHeaderDetails } from '@/lib/actions/shop.action';
import Link from 'next/link';

const RootNavbar = async () => {
	const result = await fetchHeaderDetails();
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
				<Logo link={'/'} logoClass={'w-[120px] h-auto'} />
				<ul className="mt-4 flex flex-col gap-2">
					{RootMobileNavs.map((item, index) => (
						<li key={index}>
							<RootMobileNavlink item={item} />
						</li>
					))}
					<li>
						<RootMobileNavlink
							item={{
								label: 'Cart',
								url: result.cart.link,
							}}
						/>
					</li>
					<li>
						<RootMobileNavlink
							item={{
								label: 'My Account',
								url: result.wishlist.link,
							}}
						/>
					</li>
				</ul>
			</SheetContent>
		</Sheet>
	);
};

export default RootNavbar;
