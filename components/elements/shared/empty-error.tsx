import EmptyIcon from './empty-icon';
type EmptyErrorProps = {
	title: React.ReactNode;
	description: React.ReactNode;
	Links: React.ReactNode;
	contentClass: string;
};
const EmptyError: React.FC<EmptyErrorProps> = ({
	Links,
	title,
	description,
	contentClass,
}) => {
	return (
		<div
			className={`flex flex-col gap-[20px] items-center ${contentClass}`}
		>
			<EmptyIcon />
			<h4 className={`heading-4`}>{title}</h4>
			<p className={`text-base-2`}>{description}</p>
			{Links}
		</div>
	);
};

export default EmptyError;
