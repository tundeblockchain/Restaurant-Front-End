import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import type { OrderStatus } from '@models/OrderDto';

type Props = Omit<ChipProps, 'color' | 'label'> & { status: OrderStatus };

const map: Record<OrderStatus, { label: string; color: string; bg: string }> = {
	PENDING: { label: 'PENDING', color: '#b88700', bg: 'rgba(255,193,7,0.25)' },
	DELIVERED: { label: 'DELIVERED', color: '#137333', bg: 'rgba(34,197,94,0.25)' },
	CANCELLED: { label: 'CANCELLED', color: '#b42318', bg: 'rgba(244,63,94,0.20)' },
	PROCESSING: { label: 'PROCESSING', color: '#0d47a1', bg: 'rgba(59,130,246,0.20)' }
};

export function StatusChip({ status, ...rest }: Props) {
	const s = map[status];
	return <Chip label={s.label} size="small" sx={{ color: s.color, backgroundColor: s.bg, fontWeight: 700, borderRadius: 2 }} {...rest} />;
}


