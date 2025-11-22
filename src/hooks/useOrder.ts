import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@api/orders';
import type { OrderDto } from '@models/OrderDto';

export function useOrder(id: string | undefined) {
	return useQuery({
		queryKey: ['order', id],
		queryFn: () => getOrder(id!),
		enabled: !!id
	});
}

