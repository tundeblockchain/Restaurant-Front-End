import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getRevenueAnalytics, getCustomerAnalytics, getOrderDistributionAnalytics } from '@api/dashboard';

export function useDashboardStats(startDate?: string, endDate?: string) {
	return useQuery({
		queryKey: ['dashboard', 'stats', startDate, endDate],
		queryFn: () => getDashboardStats(startDate, endDate)
	});
}

export function useRevenueAnalytics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month') {
	return useQuery({
		queryKey: ['dashboard', 'revenue', startDate, endDate, period],
		queryFn: () => getRevenueAnalytics(startDate, endDate, period),
		select: (data) => data.data
	});
}

export function useCustomerAnalytics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month') {
	return useQuery({
		queryKey: ['dashboard', 'customers', startDate, endDate, period],
		queryFn: () => getCustomerAnalytics(startDate, endDate, period),
		select: (data) => data.data
	});
}

export function useOrderDistributionAnalytics(startDate?: string, endDate?: string) {
	return useQuery({
		queryKey: ['dashboard', 'order-distribution', startDate, endDate],
		queryFn: () => getOrderDistributionAnalytics(startDate, endDate),
		select: (data) => data.data
	});
}

