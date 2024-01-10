'use client';
import { fetchMethDetailsByAdmin } from '@/lib/actions/ship.action';
import { FC, useEffect, useState } from 'react';
import FlatMethodForm from './flat-method-form';
import FreeMethodForm from './free-method-form';
import LocalPickupForm from './local-pickup-form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
type MethodUpdate = {
	data: {
		type: shipMethodType;
		id: string;
	};
};
const MethodUpdate: FC<MethodUpdate> = ({ data }) => {
	// const [flatData, setFlatData] = useState<any>();
	// const [freeData, setFreeData] = useState<any>();
	// const [localData, setLocalData] = useState<LocalUpdateForm | null>();

	// useEffect(() => {
	// 	const fetchFlatData = async () => {
	// 		const result = await fetchMethDetailsByAdmin(data);
	// 		if (result) {
	// 			setFlatData(data.type === 'FLAT_RATE' ? result : null);
	// 			setFreeData(data.type === 'FREE_SHIPPING' ? result : null);
	// 			setLocalData(data.type === 'LOCAL_PICKUP' ? result : null);
	// 		}
	// 	};
	// 	fetchFlatData();
	// }, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="badge-success h-[30px]">
					<PenSquare size={16} />
				</Button>
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
				{/* {data.type === 'FLAT_RATE' && <FlatMethodForm />}
				{data.type === 'FREE_SHIPPING' && <FreeMethodForm />}
				{data.type === 'LOCAL_PICKUP' && localData && (
					<LocalPickupForm
						defaultValues={{
							name: localData?.name,
							taxStatus: localData?.taxStatus,
							cost: 0,
						}}
						id={localData?.id}
						type={'UPDATE'}
					/>
				)}
				{JSON.stringify(localData)} */}
			</DialogContent>
		</Dialog>
	);
};

export default MethodUpdate;
