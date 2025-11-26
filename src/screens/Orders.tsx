import React from 'react';
import { Box, Paper, Typography, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { DataTable, SearchField, StatusChip } from '@ui/index';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import { useOrders } from '@hooks/useOrders';
import { useQueryClient } from '@tanstack/react-query';
import { acceptOrder as apiAcceptOrder, rejectOrder as apiRejectOrder } from '@api/orders';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';

export function Orders() {
	const { data: orders, isLoading } = useOrders();
	const queryClient = useQueryClient();
	const [sortKey, setSortKey] = React.useState<string>('createdAt');
	const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [activeId, setActiveId] = React.useState<string | null>(null);
	const navigate = useNavigate();

	const [localOrders, setLocalOrders] = React.useState<any[]>([]);
	React.useEffect(() => {
		if (orders) setLocalOrders(orders);
	}, [orders]);

	const handleSortChange = (key: string) => {
		if (sortKey === key) {
			setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortKey(key);
			setSortDirection('asc');
		}
	};

	const sorted = React.useMemo(() => {
		if (!localOrders) return [] as any[];
		const rows = [...localOrders];
		rows.sort((a: any, b: any) => {
			let va = a[sortKey as keyof typeof a];
			let vb = b[sortKey as keyof typeof b];
			if (sortKey === 'createdAt') {
				va = new Date(va as string).getTime();
				vb = new Date(vb as string).getTime();
			}
			if (typeof va === 'string') va = (va as string).toLowerCase();
			if (typeof vb === 'string') vb = (vb as string).toLowerCase();
			if (va < vb) return sortDirection === 'asc' ? -1 : 1;
			if (va > vb) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		return rows;
	}, [localOrders, sortKey, sortDirection]);

	const openMenu = (e: React.MouseEvent<HTMLElement>, id: string) => {
		setAnchorEl(e.currentTarget);
		setActiveId(id);
	};
	const closeMenu = () => {
		setAnchorEl(null);
		setActiveId(null);
	};

	const acceptOrder = async () => {
		if (!activeId) return;
		try {
			await apiAcceptOrder(activeId);
			// Invalidate and refetch orders
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			closeMenu();
		} catch (error) {
			console.error('Failed to accept order:', error);
		}
	};
	const rejectOrder = async () => {
		if (!activeId) return;
		try {
			await apiRejectOrder(activeId);
			// Invalidate and refetch orders
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			closeMenu();
		} catch (error) {
			console.error('Failed to reject order:', error);
		}
	};
	const viewOrder = () => {
		if (!activeId) return;
		navigate(`/orders/${encodeURIComponent(activeId)}`);
		closeMenu();
	};

	return (
		<Box display="grid" gap={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h5" fontWeight={800}>
					Order List
				</Typography>
				<Box display="flex" gap={2} alignItems="center" width={420}>
					<SearchField />
					<Paper elevation={0} sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1, borderRadius: 9999 }}>
						<CalendarTodayIcon fontSize="small" />
						<Typography>Today</Typography>
					</Paper>
				</Box>
			</Box>

			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				{isLoading && <Typography>Loading...</Typography>}
				{!isLoading && orders && sorted.length > 0 && (
					<DataTable
						columns={[
							{ key: 'id', header: 'Order ID', sortable: true },
							{
								key: 'createdAt',
								header: 'Date',
								sortable: true,
								render: (row: any) => (
									<Box>
										<Typography fontWeight={600}>{dayjs(row.createdAt).format('DD MMMM YYYY')}</Typography>
										<Typography variant="body2" color="text.secondary">{dayjs(row.createdAt).format('hh:mm A')}</Typography>
									</Box>
								)
							},
							{
								key: 'locationLine1',
								header: 'Location',
								sortable: true,
								render: (r: any) => (
									<Box>
										<Typography>{r.locationLine1}</Typography>
										{r.locationLine2 && (
											<Typography variant="body2" color="text.secondary">{r.locationLine2}</Typography>
										)}
									</Box>
								)
							},
							{ key: 'totalAmount', header: 'Amount', sortable: true, render: (r: any) => `$${(r.totalAmount ?? 0).toFixed(2)}` },
							{ key: 'status', header: 'Status Order', sortable: true, render: (r: any) => <StatusChip status={r.status} /> },
							{
								key: 'edit',
								header: 'Edit',
								render: (r: any) => (
									<>
										<IconButton size="small" onClick={(e) => openMenu(e, r.id)}>
											<MoreHorizIcon />
										</IconButton>
									</>
								)
							}
						]}
						rows={sorted}
						getRowId={(r: any) => r.id}
						sortKey={sortKey}
						sortDirection={sortDirection}
						onSortChange={handleSortChange}
					/>
				)}
				{!isLoading && (!orders || sorted.length === 0) && (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
						<Typography color="text.secondary">No Orders Found</Typography>
					</Box>
				)}

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={closeMenu}
					PaperProps={{ elevation: 2, sx: { borderRadius: 2, p: 0.5 } }}
				>
					{localOrders.find((o) => o.id === activeId)?.status === 'PENDING' && (
						<>
							<MenuItem onClick={acceptOrder}>
								<ListItemIcon sx={{ color: '#2d5bff' }}>
									<CheckCircleOutlineIcon fontSize="small" />
								</ListItemIcon>
								<Typography color="#2d5bff">Accept order</Typography>
							</MenuItem>
							<MenuItem onClick={rejectOrder}>
								<ListItemIcon sx={{ color: '#d92d20' }}>
									<HighlightOffOutlinedIcon fontSize="small" />
								</ListItemIcon>
								<Typography color="#d92d20">Reject order</Typography>
							</MenuItem>
						</>
					)}
					<MenuItem onClick={viewOrder}>
						<ListItemIcon>
							<VisibilityOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<Typography>View order</Typography>
					</MenuItem>
				</Menu>
			</Paper>
		</Box>
	);
}


