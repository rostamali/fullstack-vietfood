import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ShipClassForm from './ship-class-form';

const ShipClass = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">New Class</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New Class
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<div className="mt">
					<ShipClassForm
						type={'CREATE'}
						values={{
							name: '',
							description: '',
						}}
						id={null}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ShipClass;
