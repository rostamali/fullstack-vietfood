import { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import AddressForm from '../forms/address-form';
type CreateAddressProps = {
	triggerClass: string;
};

const CreateAddress: FC<CreateAddressProps> = ({ triggerClass }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className={triggerClass}>Add a new address</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4 pb-4">
						Shipping address
					</DialogTitle>
				</DialogHeader>
				<AddressForm
					defaultValues={{
						type: 'CREATE',
						contactName: '',
						phoneNumber: '',
						countryCode: '',
						stateCode: '',
						cityName: '',
						zipCode: '',
						addressLine1: '',
						addressLine2: '',
						setDefaultAddress: false,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateAddress;
