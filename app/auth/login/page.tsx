import AuthFooter from '@/components/auth/auth-form-footer';
import AuthHeader from '@/components/auth/auth-form-header';
import LoginForm from '@/components/auth/login-form';

export const metadata = {
	title: 'Login to Vietfood | Online shopping platform',
	description: `Log in to your Vietfood account and explore our wide range of food products. Enjoy convenient shopping and secure transactions on Vietfood, your trusted online food shopping platform.`,
};

const LoginPage = () => {
	return (
		<div className="auth dashboard-col-space">
			<AuthHeader
				title={
					<span>
						Login to <strong>Vietfood</strong>
					</span>
				}
			/>
			<div className="flex flex-col gap-[20px]">
				<LoginForm />
				<AuthFooter
					text={`Don't have an account?`}
					link={'/auth/signup'}
					linkText={'Sign up'}
				/>
			</div>
		</div>
	);
};

export default LoginPage;
