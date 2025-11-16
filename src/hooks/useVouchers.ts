import { useQuery } from '@tanstack/react-query';
import type { VoucherDto } from '@models/VoucherDto';
import { mockVouchers } from '@mockData/vouchers';

async function getVouchersMock(): Promise<VoucherDto[]> {
	return Promise.resolve(mockVouchers);
}

export function useVouchers() {
	return useQuery({
		queryKey: ['vouchers'],
		queryFn: getVouchersMock
	});
}


