import RootFooter from '@/components/elements/headers/root-footer';
import RootHeader from '@/components/elements/headers/root-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<>
			<RootHeader />
			<main className="font-poppins bg-gray-light">
				<div className="container">
					<div className="flex-center flex-col text-center space-y-5 py-[100px]">
						<h2 className="heading-2 text-primary-white">404</h2>
						<div className="space-y-2">
							<p className="text-base-1 text-gray-muted">
								<strong>Page not found</strong>
							</p>
							<p className="text-base-1 text-gray-muted">
								The page you are looking for is not exists
							</p>
						</div>
						<Link href="/">
							<Button className="btn-ghost-sm">Go Home</Button>
						</Link>
					</div>
				</div>
			</main>
			<RootFooter />
		</>
	);
}
