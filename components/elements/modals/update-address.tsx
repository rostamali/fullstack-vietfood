import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import AddressForm from '../forms/address-form';
import { useAddressDetails } from '@/lib/hooks/useAddress';
import AddressFormScreen from '@/components/loading/address-form-screen';
type UpdateAddressProps = {
	id: string;
	onChange: (value: string | null) => void;
};

const UpdateAddress: FC<UpdateAddressProps> = ({ id, onChange }) => {
	const { data, isLoading } = useAddressDetails(id);
	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%]">
				{isLoading || !data ? (
					<AddressFormScreen />
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4 pb-4">
								Shipping address
							</DialogTitle>
						</DialogHeader>
						<AddressForm
							defaultValues={{
								type: 'UPDATE',
								contactName: data.contactName,
								phoneNumber: data.phoneNumber,
								countryCode: data.countryCode,
								stateCode: data.stateCode,
								cityName: data.cityName || '',
								zipCode: data.zipCode,
								addressLine1: data.addressLine1 || '',
								addressLine2: data.addressLine2 || '',
								setDefaultAddress: data.defaultAddress,
							}}
							id={id}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateAddress;
