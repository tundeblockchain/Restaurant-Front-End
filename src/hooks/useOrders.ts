import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@api/orders';
import type { OrderDto } from '@models/OrderDto';

export function useOrders(params?: { page?: number; limit?: number; status?: string; startDate?: string; endDate?: string; customerId?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) {
	return useQuery({
		queryKey: ['orders', params],
		queryFn: () => getOrders(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


