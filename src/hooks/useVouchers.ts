import { useQuery } from '@tanstack/react-query';
import { getVouchers } from '@api/vouchers';
import type { VoucherDto } from '@models/VoucherDto';

export function useVouchers(params?: { page?: number; limit?: number; search?: string; active?: boolean; startDate?: string; endDate?: string }) {
	return useQuery({
		queryKey: ['vouchers', params],
		queryFn: () => getVouchers(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


