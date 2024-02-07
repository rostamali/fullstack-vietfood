import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import CatFormScreen from '@/components/loading/cat-form-screen';
import TaxForm from './tax-form';
import { useTaxDetailsById } from '@/lib/hooks/useTax';
type UpdateTax = {
	id: string;
	onChange: (value: string | null) => void;
};

const UpdateTaxModal: FC<UpdateTax> = ({ id, onChange }) => {
	const { data, isLoading } = useTaxDetailsById(id);

	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				{isLoading || !data ? (
					<CatFormScreen />
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4">
								Update Rate
							</DialogTitle>
							<DialogDescription className="text-base-2">
								Update category and add them to this site.
							</DialogDescription>
						</DialogHeader>
						<TaxForm
							defaultValues={{
								type: 'UPDATE',
								name: data.name,
								country: data.country,
								state: data.state,
								zipCode: data.taxLocations
									.map((item) => item.locationCode)
									.join(';'),
								taxRate: data.taxRate,
								priority: data.priority,
							}}
							id={data.id}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateTaxModal;
