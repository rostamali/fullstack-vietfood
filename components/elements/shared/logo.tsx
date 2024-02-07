import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type LogoProps = {
	link: string;
	logoClass: string;
};

const Logo: FC<LogoProps> = ({ link, logoClass }) => {
	return (
		<Link href={link} className="w-auto inline-block">
			<Image
				src={'/assets/vietfood-logo.png'}
				alt={'Viet Food'}
				width={763}
				height={357}
				priority={true}
				className={`object-contain ${logoClass}`}
			/>
		</Link>
	);
};

export default Logo;
