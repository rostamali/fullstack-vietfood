import RootFooter from '@/components/shared/headers/root-footer';
import RootHeader from '@/components/shared/headers/root-header';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<RootHeader />
			<main className="font-poppins bg-gray-light">{children}</main>
			<RootFooter />
		</>
	);
}
