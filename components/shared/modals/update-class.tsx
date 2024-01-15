import ShipClassForm from '@/components/ecom/shipping/ship-class-form';
import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ClassDetails } from '../tables/ship-class-list';
type UpdateClassProps = {
	defaultValues: ClassDetails | null;
	setClose: (val: ClassDetails | null) => void;
};

const UpdateClass: FC<UpdateClassProps> = ({ defaultValues, setClose }) => {
	return (
		<Dialog
			open={defaultValues ? true : false}
			onOpenChange={() => setClose(null)}
		>
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
				{defaultValues && (
					<ShipClassForm
						defaultValues={{
							type: 'UPDATE',
							name: defaultValues?.name,
							description: defaultValues?.description,
						}}
						id={defaultValues?.id}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateClass;
