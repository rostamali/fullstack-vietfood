import AuthFooter from '@/components/auth/footer';
import AuthHeader from '@/components/auth/header';
import Signup from '@/components/auth/signup';

const SignupPage = () => {
	return (
		<div className="auth dashboard-col-space">
			<AuthHeader title={<span>Create your account</span>} />
			<div className="flex flex-col gap-[20px]">
				<Signup />
				<AuthFooter
					text={`Already have an account?`}
					link={'/auth/login'}
					linkText={'Sign in'}
				/>
			</div>
		</div>
	);
};

export default SignupPage;
