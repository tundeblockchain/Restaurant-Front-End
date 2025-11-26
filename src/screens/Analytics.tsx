import React from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { NivoLineChart, NivoBarChart, NivoPieChart } from '@ui/index';
import { useRevenueAnalytics, useCustomerAnalytics, useOrderDistributionAnalytics } from '@hooks/useDashboard';
import type { Serie } from '@nivo/line';
import type { PieDatum } from '@nivo/pie';
import dayjs from 'dayjs';

export function Analytics() {
	// Calculate 30-day period: from 30 days ago to today
	const endDate = dayjs().format('YYYY-MM-DD');
	const startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
	
	const { data: revenueData, isLoading: revenueLoading } = useRevenueAnalytics(startDate, endDate, 'day');
	const { data: customerData, isLoading: customerLoading } = useCustomerAnalytics(undefined, undefined, 'month');
	const { data: orderDistributionData, isLoading: orderDistributionLoading } = useOrderDistributionAnalytics();

	// Transform revenue data for line chart
	const revenueLine: Serie[] = React.useMemo(() => {
		if (!revenueData || revenueData.length === 0) return [];
		return [
			{
				id: 'Revenue',
				color: '#ff2c7a',
				data: revenueData.map((point) => ({
					x: dayjs(point.date).format('MMM DD'),
					y: point.revenue
				}))
			}
		];
	}, [revenueData]);

	// Transform customer data for bar chart
	const customerBar = React.useMemo(() => {
		if (!customerData || customerData.length === 0) return [];
		return customerData.map((point) => ({
			month: dayjs(point.month).format('MMM'),
			Customers: point.customers
		}));
	}, [customerData]);

	// Transform order distribution data for pie chart
	const ordersPie: PieDatum[] = React.useMemo(() => {
		if (!orderDistributionData || orderDistributionData.length === 0) return [];
		return orderDistributionData.map((point) => ({
			id: point.id,
			label: point.label,
			value: point.value
		}));
	}, [orderDistributionData]);

	return (
		<Box display="grid" gap={2}>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				<Typography variant="h6" fontWeight={800}>Revenue Trend</Typography>
				{revenueLoading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height={360}>
						<CircularProgress />
					</Box>
				) : revenueLine.length > 0 ? (
					<NivoLineChart data={revenueLine} height={360} />
				) : (
					<Box display="flex" justifyContent="center" alignItems="center" height={360}>
						<Typography color="text.secondary">No revenue data available</Typography>
					</Box>
				)}
			</Paper>
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800}>Monthly Customers</Typography>
					{customerLoading ? (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<CircularProgress />
						</Box>
					) : customerBar.length > 0 ? (
						<NivoBarChart data={customerBar} keys={["Customers"]} indexBy="month" height={320} colors={["#ff2c7a"]} />
					) : (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<Typography color="text.secondary">No customer data available</Typography>
						</Box>
					)}
				</Paper>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800}>Order Distribution</Typography>
					{orderDistributionLoading ? (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<CircularProgress />
						</Box>
					) : ordersPie.length > 0 ? (
						<NivoPieChart data={ordersPie} />
					) : (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<Typography color="text.secondary">No order distribution data available</Typography>
						</Box>
					)}
				</Paper>
			</Box>
		</Box>
	);
}


