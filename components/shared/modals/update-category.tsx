import { Button } from '@/components/ui/button';
import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CategoryForm from '../forms/category-form';
import { useCategoryDetails } from '@/lib/hooks/useCategory';
import CatFormScreen from '@/components/loading/cat-form-screen';
type UpdateCategory = {
	id: string;
	onChange: (value: string | null) => void;
};

const UpdateCategory: FC<UpdateCategory> = ({ id, onChange }) => {
	const { data, isLoading } = useCategoryDetails(id);

	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				{isLoading || !data ? (
					<CatFormScreen />
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4">
								Update Category
							</DialogTitle>
							<DialogDescription className="text-base-2">
								Update category and add them to this site.
							</DialogDescription>
						</DialogHeader>
						<CategoryForm
							defaultValues={{
								name: data.name,
								type: 'UPDATE',
								thumbnail: data.thumbnail
									? [data.thumbnail]
									: null,
								parent: data.parentCategory
									? data.parentCategory.slug
									: null,
								description: data?.description || '',
							}}
							id={data.id}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCategory;
