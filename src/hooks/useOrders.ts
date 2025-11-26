import { useQuery } from '@tanstack/react-query';
import { getOrders, type GetOrdersParams } from '@api/orders';

export function useOrders(params?: GetOrdersParams) {
	return useQuery({
		queryKey: ['orders', params],
		queryFn: () => getOrders(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


