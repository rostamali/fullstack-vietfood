import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import UserForm from '../forms/user-form';

const CreateUser = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Add User</Button>
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
				<UserForm
					defaultValues={{
						firstName: '',
						lastName: '',
						email: '',
						role: '',
						password: '',
						status: '',
						type: 'CREATE',
						sendMessage: false,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateUser;
