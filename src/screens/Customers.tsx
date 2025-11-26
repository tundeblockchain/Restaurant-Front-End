import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { DataTable, SearchField } from '@ui/index';
import { useCustomers } from '@hooks/useCustomers';
import dayjs from 'dayjs';

export function Customers() {
	const [query, setQuery] = React.useState('');
	const { data, isLoading, error } = useCustomers({
		search: query.trim() || undefined
	});

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
				{error && <Typography color="error">Failed to load customers.</Typography>}
				{!isLoading && !error && data && data.length > 0 && (
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
							{ key: 'phone', header: 'Phone', render: (c: any) => c.phone || '-' },
							{ key: 'location', header: 'Location', render: (c: any) => `${c.city ?? ''}${c.city && c.country ? ', ' : ''}${c.country ?? ''}` || '-' },
							{ key: 'joinedAt', header: 'Joined', render: (c: any) => c.joinedAt ? dayjs(c.joinedAt).format('DD MMM YYYY') : '-' },
							{ key: 'totalOrders', header: 'Orders', render: (c: any) => c.totalOrders ?? 0 }
						]}
						rows={data}
						getRowId={(r: any) => r.id}
					/>
				)}
				{!isLoading && !error && (!data || data.length === 0) && (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
						<Typography color="text.secondary">No Customers Found</Typography>
					</Box>
				)}
			</Paper>
		</Box>
	);
}


