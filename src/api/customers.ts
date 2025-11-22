import { apiClient } from './client';
import type { CustomerDto } from '@models/CustomerDto';

export interface CustomersResponse {
	data: CustomerDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetCustomersParams {
	page?: number;
	limit?: number;
	search?: string;
	status?: 'ACTIVE' | 'INACTIVE';
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export async function getCustomers(params?: GetCustomersParams): Promise<CustomersResponse> {
	const res = await apiClient.get<CustomersResponse>('/customers', { params });
	return res.data;
}

export async function getCustomer(id: string): Promise<CustomerDto> {
	const res = await apiClient.get<CustomerDto>(`/customers/${id}`);
	return res.data;
}

export async function getCustomerOrders(customerId: string, page?: number, limit?: number): Promise<{ data: any[]; total: number }> {
	const res = await apiClient.get(`/customers/${customerId}/orders`, { params: { page, limit } });
	return res.data;
}

