import AuthFooter from '@/components/auth/footer';
import AuthHeader from '@/components/auth/header';
import Login from '@/components/auth/login';

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
				<Login />
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
