import { apiClient } from './client';
import type { ProductDto, ProductStatus } from '@models/ProductDto';

export interface ProductsResponse {
	data: ProductDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetProductsParams {
	page?: number;
	limit?: number;
	category?: string;
	status?: ProductStatus;
	search?: string;
}

export interface CreateProductRequest {
	name: string;
	category?: string;
	price: number;
	status: ProductStatus;
	description?: string;
	stock?: number;
	containsAllergens?: boolean;
	allergens?: string[];
	caloriesKcal?: number;
	proteinG?: number;
	carbsG?: number;
	fatG?: number;
	images?: string[];
}

export async function getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
	const res = await apiClient.get<ProductsResponse>('/products', { params });
	return res.data;
}

export async function getProduct(id: string): Promise<ProductDto> {
	const res = await apiClient.get<ProductDto>(`/products/${id}`);
	return res.data;
}

export async function createProduct(data: CreateProductRequest): Promise<ProductDto> {
	const res = await apiClient.post<ProductDto>('/products', data);
	return res.data;
}

export async function updateProduct(id: string, data: CreateProductRequest): Promise<ProductDto> {
	const res = await apiClient.put<ProductDto>(`/products/${id}`, data);
	return res.data;
}

export async function deleteProduct(id: string): Promise<void> {
	await apiClient.delete(`/products/${id}`);
}

export async function uploadProductImages(id: string, files: File[]): Promise<{ imageUrls: string[] }> {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append('images', file);
	});
	const res = await apiClient.post<{ imageUrls: string[] }>(`/products/${id}/images`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return res.data;
}


