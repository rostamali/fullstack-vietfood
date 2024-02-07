import AuthFooter from '@/components/auth/auth-form-footer';
import AuthHeader from '@/components/auth/auth-form-header';
import LoginForm from '@/components/auth/login-form';

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
