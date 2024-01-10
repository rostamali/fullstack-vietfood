import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ShipZoneForm from './ship-zone-form';

const ShipZoneModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">New Zone</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Shipping Zone
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<ShipZoneForm />
			</DialogContent>
		</Dialog>
	);
};

export default ShipZoneModal;
