import AuthFormHeader from '@/components/auth/auth-form-header';
import ResetForm from './reset-form';
import AuthFormFooter from '@/components/auth/auth-form-footer';
import { fetchForgotPasswordToken } from '@/lib/actions/auth.action';
export const metadata = {
	title: 'Reset Your Vietfood Password | Online shopping platform',
	description: `Reset your Vietfood account password to ensure account security and uninterrupted access to our online food shopping platform. Follow the instructions to create a new password and resume shopping.`,
};
type SearchParams = {
	searchParams: {
		token: string;
	};
};

const ResetPassword = async ({ searchParams }: SearchParams) => {
	const result = await fetchForgotPasswordToken(searchParams.token);
	if (!result || !result.success)
		throw new Error('Auth is required to access this resource');

	return (
		<div className="auth dashboard-col-space">
			<AuthFormHeader
				title={
					<span>
						Reset <strong>Password</strong>
					</span>
				}
			/>
			<div className="flex flex-col gap-[20px]">
				<ResetForm token={searchParams.token} />
				<AuthFormFooter
					text={`Already have an account?`}
					link={'/auth/login'}
					linkText={'Sign in'}
				/>
			</div>
		</div>
	);
};

export default ResetPassword;
