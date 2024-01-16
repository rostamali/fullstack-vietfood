import { Pause, Play } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
type VideoProps = {
	className: string;
	url: string;
};
const VideoPlayer: FC<VideoProps> = ({ className, url }) => {
	const [play, setPlay] = useState(false);
	const [hasWindow, setHasWindow] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true);
		}
	}, []);
	return (
		<div
			className={`relative group flex-center overflow-hidden rounded-md ${className} bg-white`}
		>
			{hasWindow && (
				<ReactPlayer
					className="!h-auto !w-full"
					url={`/uploads/files/${url}`}
					controls={true}
					volume={0.01}
					playing={play}
				/>
			)}
			<div className="absolute duration-150 opacity-0 top-0 left-0 w-full h-full bg-black-dark bg-opacity-40 group-hover:opacity-[1] flex-center">
				<button
					className="btn-primary-sm w-[45px] flex-center rounded-md"
					onClick={() => setPlay(!play)}
				>
					{play ? <Pause size={20} /> : <Play size={20} />}
				</button>
			</div>
		</div>
	);
};

export default VideoPlayer;
