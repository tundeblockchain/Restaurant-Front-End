import { useQuery } from '@tanstack/react-query';
// import { getProducts } from '@api/products';
import { mockProducts } from '@mockData/products';
import type { ProductDto } from '@models/ProductDto';

async function getProductsMock(): Promise<ProductDto[]> {
	return Promise.resolve(mockProducts);
}

export function useProducts() {
	return useQuery({
		queryKey: ['products'],
		queryFn: getProductsMock
	});
}


