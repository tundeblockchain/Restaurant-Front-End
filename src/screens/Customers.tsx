import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { DataTable, SearchField } from '@ui/index';
import { useCustomers } from '@hooks/useCustomers';
import dayjs from 'dayjs';

export function Customers() {
	const { data, isLoading } = useCustomers();
	const [query, setQuery] = React.useState('');

	const filtered = React.useMemo(() => {
		if (!data) return [] as any[];
		const q = query.trim().toLowerCase();
		if (!q) return data;
		return data.filter((c: any) => [c.name, c.email, c.city, c.country].some((v) => (v ?? '').toLowerCase().includes(q)));
	}, [data, query]);

	return (
		<Box display="grid" gap={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h5" fontWeight={800}>Customers</Typography>
				<Box width={420}>
					<SearchField value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} placeholder="Search customers" />
				</Box>
			</Box>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				{isLoading && <Typography>Loading...</Typography>}
				{!isLoading && (
					<DataTable
						columns={[
							{ key: 'name', header: 'Customer', render: (c: any) => (
								<Box display="flex" alignItems="center" gap={1.5}>
									<Avatar src={c.avatarUrl} />
									<Box>
										<Typography fontWeight={700}>{c.name}</Typography>
										<Typography variant="body2" color="text.secondary">{c.email}</Typography>
									</Box>
								</Box>
							)},
							{ key: 'phone', header: 'Phone' },
							{ key: 'location', header: 'Location', render: (c: any) => `${c.city ?? ''}${c.city && c.country ? ', ' : ''}${c.country ?? ''}` },
							{ key: 'joinedAt', header: 'Joined', render: (c: any) => dayjs(c.joinedAt).format('DD MMM YYYY') },
							{ key: 'totalOrders', header: 'Orders' }
						]}
						rows={filtered}
						getRowId={(r: any) => r.id}
					/>
				)}
			</Paper>
		</Box>
	);
}


