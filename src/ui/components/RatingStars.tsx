import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';

type Props = {
	value: number; // 0..5
	size?: 'small' | 'medium' | 'large';
};

export function RatingStars({ value, size = 'small' }: Props) {
	const full = Math.round(value);
	return (
		<Box display="flex" alignItems="center" gap={0.5}>
			{Array.from({ length: 5 }).map((_, i) =>
				i < full ? <StarIcon key={i} fontSize={size} sx={{ color: '#fbbf24' }} /> : <StarBorderIcon key={i} fontSize={size} sx={{ color: '#cbd5e1' }} />
			)}
		</Box>
	);
}


