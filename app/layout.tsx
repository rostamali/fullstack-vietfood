import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import '../styles/theme.css';
import { Toaster } from '@/components/ui/sonner';
import Provider from '@/lib/provider';

const fontPoppins = Poppins({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
});
export const metadata: Metadata = {
	title: `Vietfood - Your Ultimate Wholesaler In New Zealand`,
	description: `Vietfood - Your premier food wholesaler in New Zealand, providing a diverse range of fresh, frozen, and pantry essentials, along with beverages and consumables. Catering to the needs of food enthusiasts and businesses nationwide with quality products and exceptional service.`,
	openGraph: {
		title: `Vietfood - Your Ultimate Wholesaler In New Zealand`,
		description: `Vietfood - Your go-to food wholesaler in New Zealand. We supply fresh, frozen, and pantry essentials along with beverages and consumables. Quality products, exceptional service.`,
		url: process.env.HOST,
		siteName: `Vietfood`,
		images: [
			{
				url: `/assets/seo/beef.jpg`,
				width: 1260,
				height: 628,
			},
			{
				url: `/assets/seo/salmon.jpg`,
				width: 1260,
				height: 628,
			},
		],
	},
	metadataBase: new URL(process.env.HOST as string),
	icons: './favicon.ico',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${fontPoppins.variable} scrollbar-body`}>
				<Provider>{children}</Provider>
				<Toaster
					richColors
					className="font-poppins"
					position="bottom-center"
				/>
			</body>
		</html>
	);
}
