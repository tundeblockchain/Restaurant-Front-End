import { apiClient } from './client';

export interface StoreDto {
	id: string;
	name: string;
	address?: string;
	phone?: string;
	email?: string;
	description?: string;
	logoUrl?: string;
	openingHours?: {
		[key: string]: {
			open: string;
			close: string;
			closed: boolean;
		};
	};
}

export interface UpdateStoreRequest {
	name?: string;
	address?: string;
	phone?: string;
	email?: string;
	description?: string;
	logoUrl?: string;
	openingHours?: {
		[key: string]: {
			open: string;
			close: string;
			closed: boolean;
		};
	};
}

export async function getStore(): Promise<StoreDto> {
	const res = await apiClient.get<StoreDto>('/store');
	return res.data;
}

export async function updateStore(data: UpdateStoreRequest): Promise<StoreDto> {
	const res = await apiClient.put<StoreDto>('/store', data);
	return res.data;
}

