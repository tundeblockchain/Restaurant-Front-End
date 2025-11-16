import { Serie } from '@nivo/line';
import { PieDatum } from '@nivo/pie';

export const revenueLine: Serie[] = [
	{
		id: 'Income',
		color: '#ff2c7a',
		data: [
			{ x: 'Jan', y: 40 },
			{ x: 'Feb', y: 48 },
			{ x: 'Mar', y: 51 },
			{ x: 'Apr', y: 58 },
			{ x: 'May', y: 63 },
			{ x: 'Jun', y: 70 }
		]
	},
	{
		id: 'Expense',
		color: '#bdb4ff',
		data: [
			{ x: 'Jan', y: 12 },
			{ x: 'Feb', y: 16 },
			{ x: 'Mar', y: 19 },
			{ x: 'Apr', y: 20 },
			{ x: 'May', y: 22 },
			{ x: 'Jun', y: 24 }
		]
	}
];

export const customerBar = [
	{ month: 'Jan', Customers: 30 },
	{ month: 'Feb', Customers: 22 },
	{ month: 'Mar', Customers: 35 },
	{ month: 'Apr', Customers: 28 },
	{ month: 'May', Customers: 42 },
	{ month: 'Jun', Customers: 50 }
];

export const ordersPie: PieDatum[] = [
	{ id: 'Dine-in', label: 'Dine-in', value: 45 },
	{ id: 'Delivery', label: 'Delivery', value: 35 },
	{ id: 'Takeaway', label: 'Takeaway', value: 20 }
];

export const sparklineSeries = (values: number[]): Serie[] => [
	{
		id: 'series',
		data: values.map((y, i) => ({ x: i, y }))
	}
];


