'use client';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
type TitleProps = {
	title: string;
	links: {
		label: string;
		url: string;
	}[];
};

const DashboardPageTitle: FC<TitleProps> = ({ links, title }) => {
	const pathname = usePathname();
	return (
		<div className="flex flex-col items-start">
			<h3 className="heading-3">{title}</h3>
			<ul className="flex-center gap-[10px]">
				{links.map((link, index) => (
					<li key={index}>
						<Link
							href={link.url}
							className={`text-base-2 ${
								pathname === link.url
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
