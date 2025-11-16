import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { NivoLineChart, NivoBarChart, NivoPieChart } from '@ui/index';
import { revenueLine, customerBar, ordersPie } from '@mockData/charts';

export function Analytics() {
	return (
		<Box display="grid" gap={2}>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				<Typography variant="h6" fontWeight={800}>Revenue Trend</Typography>
				<NivoLineChart data={revenueLine} height={360} />
			</Paper>
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800}>Monthly Customers</Typography>
					<NivoBarChart data={customerBar} keys={["Customers"]} indexBy="month" height={320} colors={["#ff2c7a"]} />
				</Paper>
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Typography variant="h6" fontWeight={800}>Order Distribution</Typography>
					<NivoPieChart data={ordersPie as any} />
				</Paper>
			</Box>
		</Box>
	);
}


