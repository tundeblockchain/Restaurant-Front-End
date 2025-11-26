import React from 'react';
import { StatCard, Button, NivoLineChart, NivoBarChart, NivoPieChart } from '@ui/index';
import CoffeeIcon from '@mui/icons-material/FreeBreakfast';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { useDashboardStats, useRevenueAnalytics, useCustomerAnalytics, useOrderDistributionAnalytics } from '@hooks/useDashboard';
import type { Serie } from '@nivo/line';
import type { PieDatum } from '@nivo/pie';
import dayjs from 'dayjs';

const sparklineSeries = (values: number[]): Serie[] => [
	{
		id: 'series',
		data: values.map((y, i) => ({ x: i, y }))
	}
];

export function Dashboard() {
	const { data: stats, isLoading: statsLoading } = useDashboardStats();
	
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
		const transformed = orderDistributionData.map((point) => ({
			id: point.id,
			label: point.label,
			value: point.value
		}));
		// Filter out entries with zero values and check if there are any orders
		const hasOrders = transformed.some((point) => point.value > 0);
		return hasOrders ? transformed : [];
	}, [orderDistributionData]);

	const formatChange = (change: number) => {
		const sign = change >= 0 ? '+' : '';
		return `${sign}${change.toFixed(1)}%`;
	};

	const formatCurrency = (amount: number) => {
		return `$${amount.toLocaleString()}`;
	};

	if (statsLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display="grid" gap={2}>
			{/* Stat cards with sparklines */}
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))', gap: 2 }}>
				<StatCard
					title="Menus"
					value={stats?.menus.total ?? 0}
					subtitle={stats?.menus.change !== undefined ? formatChange(stats.menus.change) : undefined}
					icon={<CoffeeIcon color="primary" />}
					sparklineData={stats?.menus.trend ? sparklineSeries(stats.menus.trend) : undefined}
				/>
				<StatCard
					title="Orders"
					value={stats?.orders.total ?? 0}
					subtitle={stats?.orders.change !== undefined ? formatChange(stats.orders.change) : undefined}
					icon={<AssignmentIcon color="primary" />}
					sparklineData={stats?.orders.trend ? sparklineSeries(stats.orders.trend) : undefined}
				/>
				<StatCard
					title="Customers"
					value={stats?.customers.total ?? 0}
					subtitle={stats?.customers.change !== undefined ? formatChange(stats.customers.change) : undefined}
					icon={<PeopleIcon color="primary" />}
					sparklineData={stats?.customers.trend ? sparklineSeries(stats.customers.trend) : undefined}
				/>
				<StatCard
					title="Income"
					value={stats?.income.total !== undefined ? formatCurrency(stats.income.total) : '$0'}
					subtitle={stats?.income.change !== undefined ? formatChange(stats.income.change) : undefined}
					icon={<AttachMoneyIcon color="primary" />}
					sparklineData={stats?.income.trend ? sparklineSeries(stats.income.trend) : undefined}
				/>
			</Box>

			{/* Revenue Line Chart */}
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Revenue</Typography>
				{revenueLoading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height={320}>
						<CircularProgress />
					</Box>
				) : revenueLine.length > 0 ? (
					<NivoLineChart data={revenueLine} height={320} />
				) : (
					<Box display="flex" justifyContent="center" alignItems="center" height={320}>
						<Typography color="text.secondary">No revenue data available</Typography>
					</Box>
				)}
			</Paper>

			{/* Customer Map (Bar) and Orders Split (Pie) */}
			<Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 2 }}>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Customer Map</Typography>
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
					<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Order Types</Typography>
					{orderDistributionLoading ? (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<CircularProgress />
						</Box>
					) : ordersPie.length > 0 ? (
						<NivoPieChart data={ordersPie} />
					) : (
						<Box display="flex" justifyContent="center" alignItems="center" height={320}>
							<Typography color="text.secondary">No Orders Found</Typography>
						</Box>
					)}
				</Paper>
			</Box>

			<Box display="flex" gap={1}>
				<Button>Create Product</Button>
				<Button color="secondary" variant="outlined">View Reports</Button>
			</Box>
		</Box>
	);
}


