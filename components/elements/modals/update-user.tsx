import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import UserForm from '../forms/user-form';
import { useUserDetails } from '@/lib/hooks/useAuth';
import UserFormScreen from '@/components/loading/user-form-screen';
type UpdateUser = {
	id: string;
	onChange: (value: string | null) => void;
};
const UpdateUser: FC<UpdateUser> = ({ id, onChange }) => {
	const { data, isLoading } = useUserDetails(id);
	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-white md:max-w-[450px] max-w-[85%]">
				{isLoading || !data ? (
					<UserFormScreen />
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4">
								Update User
							</DialogTitle>
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
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateUser;
