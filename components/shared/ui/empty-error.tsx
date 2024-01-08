import Image from 'next/image';
type EmptyErrorProps = {
	containerClass: string;
	thumbnailClass: string;
	title: string;
	titleClass: string;
	description: string;
	descriptionClass: string;
	Links: React.ReactNode;
};

const EmptyError: React.FC<EmptyErrorProps> = ({
	containerClass,
	thumbnailClass,
	Links,
	title,
	titleClass,
	description,
	descriptionClass,
}) => {
	return (
		<div
			className={`flex flex-col gap-[20px] ${
				containerClass?.length > 0 ? containerClass : 'items-center'
			}`}
		>
			<Image
				src={'/assets/error-message.png'}
				alt={title}
				width={384}
				height={268}
				priority={true}
				className={`object-contain ${thumbnailClass}`}
			/>
			<h4 className={`heading-4 !font-medium ${titleClass}`}>{title}</h4>
			<p className={`text-base-2 ${descriptionClass}`}>{description}</p>
			{Links}
		</div>
	);
};

export default EmptyError;
