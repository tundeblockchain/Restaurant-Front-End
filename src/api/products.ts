import { apiClient } from './client';
import type { ProductDto } from '@models/ProductDto';

export async function getProducts() {
	const res = await apiClient.get<ProductDto[]>('/products');
	return res.data;
}

export async function getProduct(id: string) {
	const res = await apiClient.get<ProductDto>(`/products/${id}`);
	return res.data;
}


