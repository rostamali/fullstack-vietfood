'use client';
import { FC } from 'react';
import ReactPlayer from 'react-player';
type VideoProps = {
	className: string;
	url: string;
};
const Video: FC<VideoProps> = ({ className, url }) => {
	return (
		<ReactPlayer
			className={`${className}`}
			url={`/uploads/files/${url}`}
			controls={true}
			volume={0.01}
		/>
	);
};

export default Video;
