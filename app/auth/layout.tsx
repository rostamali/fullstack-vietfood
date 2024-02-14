import RootFooter from '@/components/elements/headers/root-footer';
import RootHeader from '@/components/elements/headers/root-header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<RootHeader />
			<div className="auth-page bg-gray-light">
				<div className="container flex-center py-[150px]">
					<div className="w-[400px] bg-white px-[25px] py-[40px] rounded-md">
						{children}
					</div>
				</div>
			</div>
			<RootFooter />
		</>
	);
}
