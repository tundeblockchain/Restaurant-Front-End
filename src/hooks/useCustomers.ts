import { useQuery } from '@tanstack/react-query';
import type { CustomerDto } from '@models/CustomerDto';
import { mockCustomers } from '@mockData/customers';
// import { getCustomers } from '@api/customers';

async function getCustomersMock(): Promise<CustomerDto[]> {
	return Promise.resolve(mockCustomers);
}

export function useCustomers() {
	return useQuery({
		queryKey: ['customers'],
		queryFn: getCustomersMock
	});
}


