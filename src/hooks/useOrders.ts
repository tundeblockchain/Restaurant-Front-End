import { useQuery } from '@tanstack/react-query';
import type { OrderDto } from '@models/OrderDto';
import { mockOrders } from '@mockData/orders';
// import { fetchOrders } from '@api/orders';

async function getOrders(): Promise<OrderDto[]> {
	// Swap to API when ready:
	// return await fetchOrders();
	// For now return mock data to keep UI functional.
	return Promise.resolve(mockOrders);
}

export function useOrders() {
	return useQuery({
		queryKey: ['orders'],
		queryFn: getOrders
	});
}


