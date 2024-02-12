'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useChangeShipAddress } from '@/lib/hooks/useOrder';

type AddressCardProps = {
	address: AddressCard[];
};
const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
	const { mutate: changeAddress, isPending } = useChangeShipAddress();

	return (
		<div>
			{address.length > 0 && (
				<div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
					{address.map((item, index) => (
						<div
							className={`relative group address-card overflow-hidden rounded-md flex flex-col gap-2.5 p-5 bg-white ${
								item.defaultAddress
									? 'border border-action-success border-opacity-50 pointer-events-none'
									: 'border-light'
							} ${
								isPending
									? 'pointer-events-none'
									: 'cursor-pointer'
							}`}
							key={index}
							onClick={() => {
								changeAddress({
									addressId: item.id,
								});
							}}
						>
							<div className="grid grid-cols-[30px,1fr]">
								<div>
									<Checkbox
										className="checkbox-sm"
										checked={item.defaultAddress}
									/>
								</div>
								<div className="space-y-1">
									<div className="flex justify-between items-start">
										<div className="text-base-1 !font-medium space-y-1">
											<p>{item.contactName}</p>
											<p>{item.phoneNumber}</p>
										</div>
									</div>
									<p className="text-base-2">
										{item.state}. {item.city} -
										{item.zipCode}, {item.address} -{' '}
										{item.country}
									</p>
								</div>
							</div>
							{isPending && (
								<div className="absolute w-full h-full bg-gray-light bg-opacity-40 top-0 left-0 right-0"></div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddressCard;
