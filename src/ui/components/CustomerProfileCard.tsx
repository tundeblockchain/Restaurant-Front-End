import React from 'react';
import { Avatar, Box, Chip, Divider, Typography } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

type Props = {
	name: string;
	roleLabel?: string;
	phone?: string;
	address?: string;
	avatarUrl?: string;
};

export function CustomerProfileCard({ name, roleLabel = 'Customer', phone, address, avatarUrl }: Props) {
	return (
		<Box sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper' }}>
			<Box display="flex" alignItems="center" gap={2.5}>
				<Avatar src={avatarUrl} sx={{ width: 72, height: 72 }} />
				<Box>
					<Typography variant="h6" fontWeight={800}>
						{name}
					</Typography>
					<Chip label={roleLabel} size="small" sx={{ mt: 1, bgcolor: 'rgba(255,44,122,0.12)', color: 'primary.main', fontWeight: 700 }} />
				</Box>
			</Box>

			<Box sx={{ my: 2 }}>
				<Divider />
			</Box>

			<Box display="flex" alignItems="center" gap={2} sx={{ py: 1 }}>
				<PhoneOutlinedIcon color="primary" />
				<Typography fontWeight={700}>{phone ?? '-'}</Typography>
			</Box>

			<Box display="flex" alignItems="center" gap={2} sx={{ py: 1 }}>
				<PlaceOutlinedIcon color="primary" />
				<Typography fontWeight={700}>{address ?? '-'}</Typography>
			</Box>
		</Box>
	);
}


