'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { ShipMethodList } from '@/constants';
import FlatMethodForm from './flat-method-form';
import FreeMethodForm from './free-method-form';
import LocalPickupForm from './local-pickup-form';

const ShipMethodModal = () => {
	const [method, setMethod] = useState<string>();

	return (
		<Dialog>
			<Popover>
				<PopoverTrigger asChild>
					<Button className="btn-primary-lg">New Method</Button>
				</PopoverTrigger>
				<PopoverContent className="PopoverContent bg-white p-0">
					<div className="flex flex-col">
						{ShipMethodList.map((method, index) => (
							<DialogTrigger asChild key={index}>
								<span
									className="menubar-item w-full h-auto text-left px-2 py-1.5 cursor-pointer"
									onClick={() => setMethod(method.value)}
								>
									{method.label}
								</span>
							</DialogTrigger>
						))}
					</div>
				</PopoverContent>
			</Popover>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%] max-h-[650px] overflow-y-auto scrollbar-sm">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New Class
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				{method === 'FLAT_RATE' && <FlatMethodForm />}
				{method === 'FREE_SHIPPING' && <FreeMethodForm />}
				{method === 'LOCAL_PICKUP' && (
					<LocalPickupForm
						defaultValues={{
							name: '',
							taxStatus: undefined,
							cost: 0,
						}}
						type={'CREATE'}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ShipMethodModal;
