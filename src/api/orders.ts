import { apiClient } from './client';
import type { OrderDto, OrderStatus } from '@models/OrderDto';

export interface OrdersResponse {
	data: OrderDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetOrdersParams {
	page?: number;
	limit?: number;
	status?: OrderStatus;
	startDate?: string;
	endDate?: string;
	customerId?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface CreateOrderRequest {
	customerId: string;
	items: Array<{
		productId: string;
		quantity: number;
	}>;
	locationLine1: string;
	locationLine2?: string;
	customerPhone?: string;
}

export interface UpdateOrderStatusRequest {
	status: OrderStatus;
}

export interface RejectOrderRequest {
	reason?: string;
}

export async function getOrders(params?: GetOrdersParams): Promise<OrdersResponse> {
	const res = await apiClient.get<OrdersResponse>('/orders', { params });
	return res.data;
}

export async function getOrder(id: string): Promise<OrderDto> {
	const res = await apiClient.get<OrderDto>(`/orders/${id}`);
	return res.data;
}

export async function createOrder(data: CreateOrderRequest): Promise<OrderDto> {
	const res = await apiClient.post<OrderDto>('/orders', data);
	return res.data;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<OrderDto> {
	const res = await apiClient.put<OrderDto>(`/orders/${id}/status`, { status });
	return res.data;
}

export async function acceptOrder(id: string): Promise<OrderDto> {
	const res = await apiClient.put<OrderDto>(`/orders/${id}/accept`);
	return res.data;
}

export async function rejectOrder(id: string, reason?: string): Promise<OrderDto> {
	const res = await apiClient.put<OrderDto>(`/orders/${id}/reject`, { reason });
	return res.data;
}


