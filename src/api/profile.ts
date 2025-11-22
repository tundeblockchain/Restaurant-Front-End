import { apiClient } from './client';
import type { UserDto } from '@models/UserDto';

export interface UpdateProfileRequest {
	name?: string;
	phone?: string;
	avatarUrl?: string;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export async function getProfile(): Promise<UserDto> {
	const res = await apiClient.get<UserDto>('/profile');
	return res.data;
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UserDto> {
	const res = await apiClient.put<UserDto>('/profile', data);
	return res.data;
}

export async function changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
	const res = await apiClient.put<{ message: string }>('/profile/password', data);
	return res.data;
}

