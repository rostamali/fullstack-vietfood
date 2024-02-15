import AuthFooter from '@/components/auth/auth-form-footer';
import AuthHeader from '@/components/auth/auth-form-header';
import SignupForm from '@/components/auth/signup-form';
export const metadata = {
	title: 'Create Your Vietfood Account | Online shopping platform',
	description: `Join Vietfood and gain access to a diverse selection of food products. Sign up now to enjoy exclusive offers, personalized recommendations, and hassle-free shopping experiences.`,
};

const SignupPage = () => {
	return (
		<div className="auth dashboard-col-space">
			<AuthHeader title={<span>Create your account</span>} />
			<div className="flex flex-col gap-[20px]">
				<SignupForm />
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
