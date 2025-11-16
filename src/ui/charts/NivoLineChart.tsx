import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

type Props = {
	data: Serie[];
	height?: number;
	curve?: 'linear' | 'monotoneX' | 'catmullRom' | 'step';
};

export function NivoLineChart({ data, height = 300, curve = 'monotoneX' }: Props) {
	return (
		<div style={{ height }}>
			<ResponsiveLine
				data={data}
				curve={curve}
				margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
				axisBottom={{ tickSize: 0, tickPadding: 10 }}
				axisLeft={{ tickSize: 0, tickPadding: 10 }}
				colors={{ datum: 'color' }}
				lineWidth={3}
				enablePoints={false}
				enableGridX={false}
				enableGridY={true}
				useMesh={true}
				areaOpacity={0.15}
			/>
		</div>
	);
}


