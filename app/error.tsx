'use client';
import Link from 'next/link';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-screen bg-primary-dark-200 flex flex-col items-center justify-center">
			<div className="sm:w-[550px] w-full flex flex-col items-center justify-center gap-[20px] text-center px-[20px]">
				<span className="heading-4 !text-white !text-opacity-40">
					There was a problem
				</span>
				<h2 className="heading-2 !text-white font-spaceGrotesk">
					{error.message ? error.message : 'Something went wrong'}
				</h2>
				<p className="text-base-2 !text-white !text-opacity-70">
					Please try again later or contact our support if the problem
					persists.
				</p>
				<Link href="/" className="btn-ghost !h-[45px] !px-[20px]">
					Return Home
				</Link>
			</div>
		</div>
	);
}
