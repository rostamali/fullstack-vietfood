export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="auth-page bg-gray-light">
			<div className="container flex-center min-h-screen">
				<div className="w-[400px] bg-white px-[25px] py-[40px] rounded-md">
					{children}
				</div>
			</div>
		</div>
	);
}
