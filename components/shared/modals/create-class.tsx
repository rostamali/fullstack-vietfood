import ShipClassForm from '@/components/ecom/shipping/ship-class-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const CreateClass = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Create Class</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New Class
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new class and add them to the shipping
						zones.
					</DialogDescription>
				</DialogHeader>
				<ShipClassForm
					defaultValues={{
						type: 'CREATE',
						name: '',
						description: '',
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateClass;
