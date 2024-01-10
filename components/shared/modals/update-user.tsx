import { FC } from 'react';
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
import { PenSquare } from 'lucide-react';
import { useUserDetails } from '@/lib/react-query/hooks/useAuth';
type UpdateUser = {
	id: string;
	onChange: (value: string | null) => void;
};
const UpdateUser: FC<UpdateUser> = ({ id, onChange }) => {
	const { data, isLoading } = useUserDetails(id);
	if (isLoading || !data) return 'Loading............';

	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogTrigger asChild>
				<Button className="badge-success">
					<PenSquare size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				<DialogHeader>
					<DialogTitle className="heading-4">Update User</DialogTitle>
					<DialogDescription className="text-base-2">
						Update user info and change the password.
					</DialogDescription>
				</DialogHeader>
				<UserForm
					defaultValues={{
						firstName: data.firstName,
						lastName: data.lastName ? data.lastName : '',
						email: data.email,
						role: data.role,
						password: null,
						status: data.status,
						type: 'UPDATE',
						sendMessage: false,
					}}
					id={id}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateUser;
