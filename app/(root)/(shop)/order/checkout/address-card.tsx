import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

type AddressCardProps = {
	address: AddressCard[];
};
const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
	return (
		<div>
			{address.length > 0 && (
				<div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
					{address.map((item, index) => (
						<div
							className={`address-card rounded-md flex flex-col gap-2.5 p-5 bg-white ${
								item.defaultAddress
									? 'border border-action-success border-opacity-50'
									: 'border-light'
							}`}
							key={index}
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
										<div className="flex items-center gap-2">
											<button className="font-poppins text-[12px] text-primary-green">
												Edit
											</button>
											<button className="font-poppins text-[12px] text-action-danger">
												Delete
											</button>
										</div>
									</div>
									<p className="text-base-2">
										{item.state}. {item.city} -
										{item.zipCode}, {item.address} -{' '}
										{item.country}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddressCard;
