import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CategoryForm from '../forms/category-form';

const CreateCategory = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">New Category</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create Category
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new category and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<CategoryForm
					defaultValues={{
						name: '',
						type: 'CREATE',
						thumbnail: null,
						parent: null,
						description: '',
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategory;
