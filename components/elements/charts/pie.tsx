'use client';
import { ResponsivePie } from '@nivo/pie';

const Pie = () => {
	return (
		<div className="h-[180px] !font-poppins">
			<ResponsivePie
				data={data}
				colors={['#FF6A6A', '#8FB7CD', '#CDC2C3', '#85BC39', '#F3E679']}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				innerRadius={0.5}
				padAngle={2}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from: 'color',
					modifiers: [['darker', 0.2]],
				}}
				enableArcLinkLabels={false}
				enableArcLabels={false}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from: 'color',
					modifiers: [['darker', 2]],
				}}
				defs={[
					{
						id: 'dots',
						type: 'patternDots',
						background: 'inherit',
						color: 'rgba(255, 255, 255, 0.3)',
						size: 4,
						padding: 1,
						stagger: true,
					},
					{
						id: 'lines',
						type: 'patternLines',
						background: 'inherit',
						color: 'rgba(255, 255, 255, 0.3)',
						rotation: -45,
						lineWidth: 6,
						spacing: 10,
					},
				]}
				legends={[]}
			/>
		</div>
	);
};

const data = [
	{
		id: 'lisp',
		label: 'lisp',
		value: 459,
		color: 'hsl(131, 70%, 50%)',
	},
	{
		id: 'haskell',
		label: 'haskell',
		value: 556,
		color: 'hsl(20, 70%, 50%)',
	},
	{
		id: 'php',
		label: 'php',
		value: 211,
		color: 'hsl(310, 70%, 50%)',
	},
	{
		id: 'sass',
		label: 'sass',
		value: 58,
		color: 'hsl(37, 70%, 50%)',
	},
	{
		id: 'rust',
		label: 'rust',
		value: 560,
		color: 'hsl(33, 70%, 50%)',
	},
];

export default Pie;
