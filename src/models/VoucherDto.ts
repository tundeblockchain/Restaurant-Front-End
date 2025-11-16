export type VoucherType = 'PERCENT' | 'AMOUNT';

export interface VoucherDto {
	id: string;
	code: string;
	title: string;
	type: VoucherType;
	value: number; // percent or amount
	minOrder?: number;
	maxDiscount?: number;
	startDate: string; // ISO
	endDate: string; // ISO
	active: boolean;
	usageCount: number;
}


