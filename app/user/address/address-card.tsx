'use client';
import UpdateAddress from '@/components/elements/modals/update-address';
import EmptyError from '@/components/elements/shared/empty-error';
import { Badge } from '@/components/ui/badge';
import { useDeleteAddress } from '@/lib/hooks/useAddress';
import { FC, useState } from 'react';
type AddressCardProps = {
	address: AddressCard[];
};
const AddressCard: FC<AddressCardProps> = ({ address }) => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const { mutate: deleteAddress, isPending } = useDeleteAddress();

	return (
		<div className="user-addresses">
			{address.length > 0 ? (
				<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
					{address.map((item, index) => (
						<div
							className="address-card border-light rounded-md flex flex-col gap-2.5 p-5 bg-white"
							key={index}
						>
							<div className="flex justify-between items-start">
								<div className="flex flex-col gap-2 text-base-1 !font-medium">
									<span>{item.contactName}</span>
									<span>{item.phoneNumber}</span>
								</div>
								<div className="flex items-center gap-2">
									<button
										className="font-poppins text-[12px] text-primary-green"
										onClick={() => setSelectedId(item.id)}
									>
										Edit
									</button>
									<button
										disabled={isPending}
										className="font-poppins text-[12px] text-action-danger"
										onClick={() => {
											deleteAddress({ id: item.id });
										}}
									>
										Delete
									</button>
								</div>
							</div>
							<p className="text-base-2">
								{item.state}. {item.city} -{item.zipCode},{' '}
								{item.address} - {item.country}
							</p>
							<div className="flex gap-1.5 flex-wrap text-base-2">
								<Badge variant="outline">Address</Badge>
								{item.defaultAddress && (
									<Badge variant="outline">
										DEFAULT ADDRESS
									</Badge>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'No address found to show'}
					description={`Oops! Currently, there are no address to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={
						<a
							href="/user/address"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Reload Now
						</a>
					}
				/>
			)}
			{selectedId && (
				<UpdateAddress id={selectedId} onChange={setSelectedId} />
			)}
		</div>
	);
};

export default AddressCard;
