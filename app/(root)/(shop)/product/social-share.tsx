'use client';
import { Separator } from '@/components/ui/separator';
import { FC } from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
} from 'react-share';
type SocialShareProps = {
	shareUrl: string;
};
const SocialShare: FC<SocialShareProps> = ({ shareUrl }) => {
	return (
		<div className="flex items-center gap-2 text-base-2">
			<FacebookShareButton url={shareUrl}>Facebook</FacebookShareButton>
			<Separator
				orientation="vertical"
				className="h-4 w-[2px] bg-primary-gray bg-opacity-30"
			/>
			<LinkedinShareButton url={shareUrl}>Linkedin</LinkedinShareButton>
			<Separator
				orientation="vertical"
				className="h-4 w-[2px] bg-primary-gray bg-opacity-30"
			/>
			<WhatsappShareButton url={shareUrl}>Whatsapp</WhatsappShareButton>
		</div>
	);
};

export default SocialShare;
