import { apiClient } from './client';

export interface DashboardStats {
	menus: {
		total: number;
		change: number;
		trend: number[];
	};
	orders: {
		total: number;
		change: number;
		trend: number[];
	};
	customers: {
		total: number;
		change: number;
		trend: number[];
	};
	income: {
		total: number;
		change: number;
		trend: number[];
	};
}

export interface RevenueDataPoint {
	date: string;
	revenue: number;
}

export interface CustomerDataPoint {
	month: string;
	customers: number;
}

export interface OrderDistributionDataPoint {
	id: string;
	label: string;
	value: number;
}

export async function getDashboardStats(startDate?: string, endDate?: string): Promise<DashboardStats> {
	const res = await apiClient.get<DashboardStats>('/dashboard/stats', {
		params: { startDate, endDate }
	});
	return res.data;
}

export async function getRevenueAnalytics(
	startDate?: string,
	endDate?: string,
	period?: 'day' | 'week' | 'month'
): Promise<{ data: RevenueDataPoint[] }> {
	const res = await apiClient.get<{ data: RevenueDataPoint[] }>('/analytics/revenue', {
		params: { startDate, endDate, period }
	});
	return res.data;
}

export async function getCustomerAnalytics(
	startDate?: string,
	endDate?: string,
	period?: 'day' | 'week' | 'month'
): Promise<{ data: CustomerDataPoint[] }> {
	const res = await apiClient.get<{ data: CustomerDataPoint[] }>('/analytics/customers', {
		params: { startDate, endDate, period }
	});
	return res.data;
}

export async function getOrderDistributionAnalytics(
	startDate?: string,
	endDate?: string
): Promise<{ data: OrderDistributionDataPoint[] }> {
	const res = await apiClient.get<{ data: OrderDistributionDataPoint[] }>('/analytics/orders', {
		params: { startDate, endDate }
	});
	return res.data;
}

