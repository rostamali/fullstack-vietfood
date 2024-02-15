import AuthFormFooter from '@/components/auth/auth-form-footer';
import AuthFormHeader from '@/components/auth/auth-form-header';
import ForgotForm from './forgot-form';
export const metadata = {
	title: 'Forgot Password | Online shopping platform',
	description: `Forgot your password? No worries! Recover access to your Vietfood account by resetting your password. Follow the simple steps to regain access and continue shopping with ease.`,
};

const ForgotPassword = () => {
	return (
		<div className="auth dashboard-col-space">
			<AuthFormHeader
				title={
					<span>
						Forgot <strong>Password</strong>
					</span>
				}
			/>
			<div className="flex flex-col gap-[20px]">
				<ForgotForm />
				<AuthFormFooter
					text={`Already have an account?`}
					link={'/auth/login'}
					linkText={'Sign in'}
				/>
			</div>
		</div>
	);
};

export default ForgotPassword;
