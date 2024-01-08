import { FC } from 'react';
type AuthHeaderProps = {
	title: React.ReactNode;
};
const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
	return (
		<div className="flex flex-col items-center">
			<h4 className="heading-4 !font-medium">{title}</h4>
		</div>
	);
};

export default AuthHeader;
