import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { CategoryBadge } from './CategoryBadge';
import { RatingStars } from './RatingStars';

type Props = {
	imageUrl?: string;
	category?: string;
	name: string;
	rating?: number;
	reviewsCount?: number;
};

export function ProductListRow({ imageUrl, category, name, rating = 0, reviewsCount = 0 }: Props) {
	return (
		<Box display="flex" alignItems="center" gap={2} sx={{ py: 1.5 }}>
			<Avatar src={imageUrl} variant="rounded" sx={{ width: 72, height: 72 }} />
			<Box>
				{category && <CategoryBadge label={category} />}
				<Typography fontWeight={700}>{name}</Typography>
				<Box display="flex" alignItems="center" gap={1} mt={0.5}>
					<RatingStars value={rating} />
					<Typography variant="body2" color="text.secondary">({reviewsCount} reviews)</Typography>
				</Box>
			</Box>
		</Box>
	);
}


