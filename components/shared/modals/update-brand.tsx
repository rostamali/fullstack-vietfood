'use client';
import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import BrandForm from '../forms/brand-form';
import { useBrandDetailsById } from '@/lib/hooks/useBrand';
type UpdateBrand = {
	id: string;
	onChange: (value: string | null) => void;
};

const UpdateBrand: FC<UpdateBrand> = ({ id, onChange }) => {
	const { data } = useBrandDetailsById(id);

	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-white md:max-w-[550px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Update Brand
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Update brand details and add them to this site.
					</DialogDescription>
				</DialogHeader>
				{data && (
					<BrandForm
						value={{
							type: 'UPDATE',
							name: data.name,
							thumbnail: data.thumbnail ? [data.thumbnail] : null,
							contactName: data.contactName || undefined,
							contactEmail: data.contactEmail || undefined,
							contactPhone: data.contactPhone || undefined,
							contactWebsite: data.contactWebsite || undefined,
							description: data.description || '',
						}}
						id={data.id}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateBrand;
