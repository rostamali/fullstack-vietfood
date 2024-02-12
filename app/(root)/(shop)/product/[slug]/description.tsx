'use client';
import edjsParser from 'editorjs-parser';
const parser = new edjsParser();
type Props = {
	description: any;
};

const Description: React.FC<Props> = ({ description }) => {
	const markup = parser.parse(description);
	function createMarkup() {
		return { __html: markup };
	}

	return (
		<div
			className="content-description"
			dangerouslySetInnerHTML={createMarkup()}
		></div>
	);
};

export default Description;
