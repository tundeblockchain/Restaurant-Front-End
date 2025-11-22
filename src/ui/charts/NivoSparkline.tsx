import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

type Props = {
	data: Serie[];
	height?: number;
	color?: string;
};

export function NivoSparkline({ data, height = 80, color = '#ff2c7a' }: Props) {
	return (
		<div style={{ height }}>
			<ResponsiveLine
				data={data}
				margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
				colors={[color]}
				lineWidth={2}
				enablePoints={false}
				enableArea={false}
				enableGridX={false}
				enableGridY={false}
				axisBottom={null}
				axisLeft={null}
				useMesh
			/>
		</div>
	);
}


