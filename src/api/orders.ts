import { apiClient } from './client';
import type { OrderDto } from '@models/OrderDto';

export async function fetchOrders(): Promise<OrderDto[]> {
	// Ready for real API. Example:
	// const res = await apiClient.get<OrderDto[]>('/orders');
	// return res.data;
	throw new Error('API not implemented'); // swap to real request when backend is ready
}


