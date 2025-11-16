import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

type Props = {
	data: any[];
	indexBy: string;
	keys: string[];
	height?: number;
	colors?: string[];
};

export function NivoBarChart({ data, indexBy, keys, height = 300, colors }: Props) {
	return (
		<div style={{ height }}>
			<ResponsiveBar
				data={data}
				keys={keys}
				indexBy={indexBy}
				margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={colors ?? { scheme: 'nivo' }}
				axisBottom={{ tickSize: 0, tickPadding: 10 }}
				axisLeft={{ tickSize: 0, tickPadding: 10 }}
				enableGridY
				labelSkipWidth={16}
				labelSkipHeight={16}
			/>
		</div>
	);
}


