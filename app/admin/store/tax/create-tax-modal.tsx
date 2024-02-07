import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import TaxForm from './tax-form';

const CreateTaxModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Insert Rate</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create Tax Rate
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a new tax rates for specific location.
					</DialogDescription>
				</DialogHeader>
				<TaxForm
					defaultValues={{
						type: 'CREATE',
						name: '',
						country: null,
						state: null,
						zipCode: '',
						taxRate: 0,
						priority: 1,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTaxModal;
