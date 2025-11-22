import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@api/products';
import type { ProductDto } from '@models/ProductDto';

export function useProducts(params?: { page?: number; limit?: number; category?: string; status?: string; search?: string }) {
	return useQuery({
		queryKey: ['products', params],
		queryFn: () => getProducts(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


