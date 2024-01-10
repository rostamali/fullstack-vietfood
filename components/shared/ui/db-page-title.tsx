'use client';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
type TitleProps = {
	title: string;
	links: {
		label: string;
		url: string;
	}[];
	params: string | null;
};

const DashboardPageTitle: FC<TitleProps> = ({ links, title, params }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const removeQueryParams = (url: string) => {
		if (params) {
			const modifiedPath = `${pathname}?${params}=${searchParams.get(
				params,
			)}`;
			return modifiedPath === url;
		}
		return pathname === url;
	};

	return (
		<div className="flex flex-col items-start">
			<h3 className="heading-3">{title}</h3>
			<ul className="flex-center gap-[10px]">
				{links.map((link, index) => (
					<li key={index}>
						<Link
							href={link.url}
							className={`text-base-2 ${
								removeQueryParams(link.url)
									? '!text-primary-green !underline'
									: ''
							}`}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DashboardPageTitle;
