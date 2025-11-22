import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@api/customers';
import type { CustomerDto } from '@models/CustomerDto';

export function useCustomers(params?: { page?: number; limit?: number; search?: string; status?: 'ACTIVE' | 'INACTIVE'; sortBy?: string; sortOrder?: 'asc' | 'desc' }) {
	return useQuery({
		queryKey: ['customers', params],
		queryFn: () => getCustomers(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


