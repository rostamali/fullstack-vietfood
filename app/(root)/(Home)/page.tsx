'use client';
import AddressForm from '@/components/shared/forms/address-form';
import EmptyIcon from '@/components/shared/ui/empty-icon';
import { useLoadModalFiles } from '@/lib/hooks/useInfinity';

export default function Home() {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useLoadModalFiles();

	return (
		<div className="min-h-screen flex flex-col p-20 gap-[30px]">
			<div className="container">
				<AddressForm
					defaultValues={{
						type: 'CREATE',
						contactName: '',
						phoneNumber: '',
						countryCode: '',
						stateCode: '',
						cityName: null,
						zipCode: '',
						addressLine1: '',
						addressLine2: '',
						setDefaultAddress: false,
					}}
				/>
			</div>
		</div>
	);
}
