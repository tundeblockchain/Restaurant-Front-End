import React from 'react';
import { ResponsivePie, PieDatum } from '@nivo/pie';

type Props = {
	data: PieDatum[];
	height?: number;
};

export function NivoPieChart({ data, height = 260 }: Props) {
	return (
		<div style={{ height }}>
			<ResponsivePie
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				innerRadius={0.6}
				padAngle={2}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				colors={{ scheme: 'pastel1' }}
				borderWidth={1}
				borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
				enableArcLabels={false}
				legends={[
					{
						anchor: 'bottom',
						direction: 'row',
						justify: false,
						translateY: 24,
						itemWidth: 100,
						itemHeight: 14,
						symbolSize: 10,
						symbolShape: 'circle'
					}
				]}
			/>
		</div>
	);
}


