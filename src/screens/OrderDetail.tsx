import React from 'react';
import { Box, Paper, Typography, IconButton, Menu, MenuItem, Chip, ListItemIcon } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '@hooks/useOrders';
import dayjs from 'dayjs';
import { StepTimelineCard, DataTable, ProductListRow, CustomerProfileCard } from '@ui/index';

export function OrderDetail() {
	const navigate = useNavigate();
	const { orderId } = useParams();
	const decodedId = orderId ? decodeURIComponent(orderId) : undefined;
	const { data } = useOrders();
	const order = data?.find((o) => o.id === decodedId);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget as any);
	const handleClose = () => setAnchorEl(null);

	const statusLabel = order?.status === 'DELIVERED' ? 'DELIVERED' : order?.status === 'PENDING' ? 'ON DELIVERY' : order?.status ?? '';

	const steps = [
		{ label: 'Order Created', subtitle: dayjs(order?.createdAt).format('ddd, DD Jul YYYY, hh:mm A'), active: true },
		{ label: 'Payment Success', subtitle: dayjs(order?.createdAt).add(1, 'day').format('ddd, DD Jul YYYY, hh:mm A'), active: true },
		{ label: 'On Delivery', subtitle: dayjs(order?.createdAt).add(2, 'day').format('ddd, DD Jul YYYY, hh:mm A'), active: order?.status !== 'CANCELLED' },
		{ label: 'Order Delivered', subtitle: dayjs(order?.createdAt).add(2, 'day').format('ddd, DD Jul YYYY, hh:mm A'), active: order?.status === 'DELIVERED' }
	];

	const subtotal = (order?.items ?? []).reduce((sum, it) => sum + it.price * it.quantity, 0);
	const taxRate = 0.08; // 8% tax placeholder
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	return (
		<Box display="grid" gap={3}>
			{/* Header */}
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Box display="flex" alignItems="center" gap={2}>
					<Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
						<ArrowBackIosNewIcon fontSize="small" />
						<Typography fontWeight={700}>Back</Typography>
					</Box>
					<Typography variant="h5" fontWeight={800}>Order ID {order?.id}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Chip
						icon={<LocalShippingIcon sx={{ color: 'primary.contrastText' }} />}
						label={statusLabel}
						color="primary"
						onClick={handleOpen}
						sx={{ px: 1.5, py: 0.5, color: 'primary.contrastText', borderRadius: 9999, fontWeight: 700 }}
					/>
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ elevation: 2, sx: { borderRadius: 2 } }}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ScheduleIcon fontSize="small" />
							</ListItemIcon>
							<Typography>On Delivery</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<CheckCircleOutlineIcon fontSize="small" />
							</ListItemIcon>
							<Typography>Delivered</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</Box>

			{/* Breadcrumb */}
			<Box display="flex" gap={1}>
				<Typography fontWeight={700}>Orders</Typography>
				<Typography>/</Typography>
				<Typography color="text.secondary">Order Details</Typography>
			</Box>

			<StepTimelineCard steps={steps} />

			{order?.items && (
				<Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
					<Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Items</Typography>
					<DataTable
						columns={[
							{ key: 'item', header: 'Items', render: (it: any) => (
								<ProductListRow imageUrl={it.imageUrl} category={it.category} name={it.name} rating={it.rating} reviewsCount={it.reviewsCount} />
							)},
							{ key: 'quantity', header: 'Qty', render: (it: any) => <Typography fontWeight={700}>{it.quantity}x</Typography>, width: 80 },
							{ key: 'price', header: 'Price', render: (it: any) => <Typography fontWeight={700}>${it.price.toFixed(2)}</Typography>, width: 120 },
							{ key: 'total', header: 'Total Price', render: (it: any) => <Typography fontWeight={700}>${(it.price * it.quantity).toFixed(2)}</Typography>, width: 140 }
						]}
						rows={order.items}
						getRowId={(r: any) => `${r.productId}`}
					/>

					{/* Totals Summary */}
					<Box display="grid" gap={1} sx={{ mt: 2 }}>
						<Box display="flex" justifyContent="flex-end" gap={6}>
							<Box width={200}><Typography color="text.secondary">Subtotal</Typography></Box>
							<Box width={120} textAlign="right"><Typography fontWeight={700}>${subtotal.toFixed(2)}</Typography></Box>
						</Box>
						<Box display="flex" justifyContent="flex-end" gap={6}>
							<Box width={200}><Typography color="text.secondary">Tax (8%)</Typography></Box>
							<Box width={120} textAlign="right"><Typography fontWeight={700}>${tax.toFixed(2)}</Typography></Box>
						</Box>
						<Box display="flex" justifyContent="flex-end" gap={6}>
							<Box width={200}><Typography fontWeight={800}>Total</Typography></Box>
							<Box width={120} textAlign="right"><Typography fontWeight={800}>${total.toFixed(2)}</Typography></Box>
						</Box>
					</Box>
				</Paper>
			)}

			{/* Customer Profile below items */}
			{order && (
				<CustomerProfileCard
					name={order.customerName}
					roleLabel="Customer"
					phone={order.customerPhone}
					address={`${order.locationLine1}${order.locationLine2 ? ' ' + order.locationLine2 : ''}`}
					avatarUrl={order.customerAvatarUrl}
				/>
			)}
		</Box>
	);
}


