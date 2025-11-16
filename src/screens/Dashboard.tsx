import React from 'react';
import { StatCard, Button, NivoLineChart, NivoBarChart, NivoPieChart } from '@ui/index';
import CoffeeIcon from '@mui/icons-material/FreeBreakfast';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Paper, Typography } from '@mui/material';
import { revenueLine, customerBar, ordersPie, sparklineSeries } from '@mockData/charts';

export function Dashboard() {
	return (
		<Box display="grid" gap={2}>
			{/* Stat cards with sparklines */}
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))', gap: 2 }}>
				<StatCard title="Menus" value={56} subtitle="+4%" icon={<CoffeeIcon color="primary" />} sparklineData={sparklineSeries([3,4,3,5,6,5,7])} />
				<StatCard title="Orders" value={785} subtitle="+2.7%" icon={<AssignmentIcon color="primary" />} sparklineData={sparklineSeries([5,6,6,7,9,8,10])} />
				<StatCard title="Customers" value={56} subtitle="-3%" icon={<PeopleIcon color="primary" />} sparklineData={sparklineSeries([6,6,5,5,4,5,4])} />
				<StatCard title="Income" value="$6231" subtitle="-3.7%" icon={<AttachMoneyIcon color="primary" />} sparklineData={sparklineSeries([4,5,6,7,7,8,7])} />
			</Box>

			{/* Revenue Line Chart */}
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Revenue</Typography>
				<NivoLineChart data={revenueLine} height={320} />
			</Paper>

			{/* Customer Map (Bar) and Orders Split (Pie) */}
			<Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 2 }}>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Customer Map</Typography>
					<NivoBarChart data={customerBar} keys={["Customers"]} indexBy="month" height={320} colors={["#ff2c7a"]} />
				</Paper>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Order Types</Typography>
					<NivoPieChart data={ordersPie as any} />
				</Paper>
			</Box>

			<Box display="flex" gap={1}>
				<Button>Create Product</Button>
				<Button color="secondary" variant="outlined">View Reports</Button>
			</Box>
		</Box>
	);
}


