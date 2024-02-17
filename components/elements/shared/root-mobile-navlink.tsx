'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type LinkProps = {
	item: {
		label: string;
		url: string;
	};
};

const RootMobileNavlink: React.FC<LinkProps> = ({ item }) => {
	const pathanme = usePathname();

	return (
		<Link
			href={item.url}
			className={`font-poppins flex w-full px-4 py-2.5 rounded-md text-[15px] font-medium ${
				item.url === pathanme
					? 'bg-action-success text-white'
					: 'text-black-dark'
			} `}
		>
			{item.label}
		</Link>
	);
};

export default RootMobileNavlink;
