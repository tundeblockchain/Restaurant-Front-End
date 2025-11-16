import React from 'react';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import { NivoSparkline } from '../charts/NivoSparkline';
import type { Serie } from '@nivo/line';

type Props = {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: React.ReactNode;
	sparklineData?: Serie[];
	sparklineColor?: string;
};

export function StatCard({ title, value, subtitle, icon, sparklineData, sparklineColor }: Props) {
	return (
		<Card elevation={0} sx={{ borderRadius: 2 }}>
			<CardContent>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Typography variant="h4" fontWeight={800}>
						{value}
					</Typography>
					{icon}
				</Stack>
				<Typography variant="subtitle1" color="text.secondary">
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="success.main" fontWeight={600} mt={1}>
						{subtitle}
					</Typography>
				)}
				{sparklineData && (
					<Box mt={1}>
						<NivoSparkline data={sparklineData} color={sparklineColor} />
					</Box>
				)}
			</CardContent>
		</Card>
	);
}


