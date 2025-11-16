import type { VoucherDto } from '@models/VoucherDto';

export const mockVouchers: VoucherDto[] = [
	{
		id: 'vch_001',
		code: 'WELCOME10',
		title: 'Welcome 10% off',
		type: 'PERCENT',
		value: 10,
		minOrder: 20,
		maxDiscount: 15,
		startDate: '2025-01-01T00:00:00Z',
		endDate: '2025-12-31T23:59:59Z',
		active: true,
		usageCount: 123
	},
	{
		id: 'vch_002',
		code: 'FREESHIP',
		title: 'Free Shipping $5',
		type: 'AMOUNT',
		value: 5,
		minOrder: 25,
		startDate: '2025-02-01T00:00:00Z',
		endDate: '2025-08-01T00:00:00Z',
		active: false,
		usageCount: 45
	}
];


