'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import Brand from '../forms/brand';

const NewBrand = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">New Brand</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New Brand
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<Brand
					value={{
						name: '',
						thumbnail: null,
						contactName: undefined,
						contactEmail: undefined,
						contactPhone: undefined,
						contactWebsite: undefined,
						description: '',
					}}
					id={null}
					type={'CREATE'}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default NewBrand;
