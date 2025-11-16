import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
	label: string;
};

const colorMap: Record<string, { bg: string; color: string }> = {
	'MAIN COURSE': { bg: 'rgba(255,44,122,0.12)', color: '#ff2c7a' },
	Burgers: { bg: 'rgba(108,99,255,0.12)', color: '#6C63FF' },
	Wraps: { bg: 'rgba(14,165,233,0.12)', color: '#0ea5e9' },
	Salads: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
	Drinks: { bg: 'rgba(244,114,182,0.18)', color: '#db2777' }
};

export function CategoryBadge({ label }: Props) {
	const colors = colorMap[label] ?? { bg: 'rgba(16,24,40,0.06)', color: '#111827' };
	return (
		<Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, borderRadius: 1, backgroundColor: colors.bg }}>
			<Typography variant="caption" fontWeight={800} sx={{ color: colors.color, letterSpacing: 0.5 }}>
				{label}
			</Typography>
		</Box>
	);
}


