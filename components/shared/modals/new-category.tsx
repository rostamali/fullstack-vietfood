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
import Category from '../forms/category';

const NewCategory = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">New Category</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">
						Create New User
					</DialogTitle>
					<DialogDescription className="text-base-2">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<div className="mt">
					<Category
						value={{
							name: '',
							parent: null,
							description: '',
							thumbnail: null,
						}}
						id={null}
						type={'CREATE'}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NewCategory;
