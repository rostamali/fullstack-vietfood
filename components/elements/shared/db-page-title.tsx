'use client';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, MoveLeft } from 'lucide-react';
import SmallTooltip from './small-tooltip';
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
	const router = useRouter();
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
			<div className="flex items-center gap-2">
				<SmallTooltip content="Go Back">
					<button
						className="bg-white h-[30px] w-[30px] rounded-md flex-center text-black-dark"
						onClick={() => {
							router.back();
						}}
					>
						<MoveLeft size={16} />
					</button>
				</SmallTooltip>
				<h3 className="heading-3">{title}</h3>
			</div>
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
