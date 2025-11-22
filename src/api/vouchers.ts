import { apiClient } from './client';
import type { VoucherDto, VoucherType } from '@models/VoucherDto';

export interface VouchersResponse {
	data: VoucherDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetVouchersParams {
	page?: number;
	limit?: number;
	search?: string;
	active?: boolean;
	startDate?: string;
	endDate?: string;
}

export interface CreateVoucherRequest {
	code: string;
	title: string;
	type: VoucherType;
	value: number;
	minOrder?: number;
	maxDiscount?: number;
	startDate: string;
	endDate: string;
	active: boolean;
}

export async function getVouchers(params?: GetVouchersParams): Promise<VouchersResponse> {
	const res = await apiClient.get<VouchersResponse>('/vouchers', { params });
	return res.data;
}

export async function getVoucher(id: string): Promise<VoucherDto> {
	const res = await apiClient.get<VoucherDto>(`/vouchers/${id}`);
	return res.data;
}

export async function createVoucher(data: CreateVoucherRequest): Promise<VoucherDto> {
	const res = await apiClient.post<VoucherDto>('/vouchers', data);
	return res.data;
}

export async function updateVoucher(id: string, data: CreateVoucherRequest): Promise<VoucherDto> {
	const res = await apiClient.put<VoucherDto>(`/vouchers/${id}`, data);
	return res.data;
}

export async function deleteVoucher(id: string): Promise<void> {
	await apiClient.delete(`/vouchers/${id}`);
}

export async function validateVoucher(code: string): Promise<{ valid: boolean; voucher: VoucherDto | null; message: string }> {
	const res = await apiClient.get(`/vouchers/validate/${code}`);
	return res.data;
}

