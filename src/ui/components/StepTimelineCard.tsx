import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export type StepItem = {
	label: string;
	subtitle?: string;
	active?: boolean;
};

type Props = {
	steps: StepItem[];
};

export function StepTimelineCard({ steps }: Props) {
	const lastActiveIndex = steps.reduce((idx, s, i) => (s.active ? i : idx), -1);

	return (
		<Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
			<Box display="grid" gridTemplateColumns={`repeat(${steps.length}, 1fr)`} gap={4} alignItems="start">
				{steps.map((s, idx) => (
					<Box key={s.label}>
						<Box display="flex" alignItems="center">
							<Box
								sx={{
									width: 16,
									height: 16,
									borderRadius: '50%',
									backgroundColor: s.active ? 'primary.main' : 'grey.700'
								}}
							/>
							{idx < steps.length - 1 && (
								<Box
									sx={{
										flex: 1,
										height: 4,
										ml: 1.5,
										mr: 1.5,
										borderRadius: 2,
										background: idx < lastActiveIndex ? 'linear-gradient(90deg, #ff2c7a 0%, #ff2c7a 100%)' : 'rgba(16,24,40,0.5)'
									}}
								/>
							)}
						</Box>
						<Typography mt={2} fontWeight={700} color={s.active ? 'text.primary' : 'text.secondary'}>
							{s.label}
						</Typography>
						{s.subtitle && (
							<Typography mt={0.5} variant="body2" color="text.secondary">
								{s.subtitle}
							</Typography>
						)}
					</Box>
				))}
			</Box>
		</Paper>
	);
}


