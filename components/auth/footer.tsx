import Link from 'next/link';
import { FC } from 'react';
type AuthFooterProps = {
	text: string;
	link: string;
	linkText: string;
};

const AuthFooter: FC<AuthFooterProps> = ({ text, link, linkText }) => {
	return (
		<div className="auth-footer text-center">
			<p className="text-base-2">
				{text}{' '}
				<Link
					href={link}
					className="underline hover:text-action-danger"
				>
					{linkText}
				</Link>
			</p>
		</div>
	);
};

export default AuthFooter;
