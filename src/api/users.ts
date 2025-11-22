import { apiClient } from './client';
import type { UserDto, UserRole } from '@models/UserDto';

export interface UsersResponse {
	data: UserDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetUsersParams {
	page?: number;
	limit?: number;
	role?: UserRole;
	search?: string;
	status?: 'ACTIVE' | 'INACTIVE';
}

export interface CreateUserRequest {
	name: string;
	email: string;
	role: UserRole;
	phone?: string;
	password: string;
}

export interface UpdateUserRequest {
	name?: string;
	email?: string;
	role?: UserRole;
	phone?: string;
	status?: 'ACTIVE' | 'INACTIVE';
}

export async function getUsers(params?: GetUsersParams): Promise<UsersResponse> {
	const res = await apiClient.get<UsersResponse>('/users', { params });
	return res.data;
}

export async function getUser(id: string): Promise<UserDto> {
	const res = await apiClient.get<UserDto>(`/users/${id}`);
	return res.data;
}

export async function createUser(data: CreateUserRequest): Promise<UserDto> {
	const res = await apiClient.post<UserDto>('/users', data);
	return res.data;
}

export async function updateUser(id: string, data: UpdateUserRequest): Promise<UserDto> {
	const res = await apiClient.put<UserDto>(`/users/${id}`, data);
	return res.data;
}

export async function deleteUser(id: string): Promise<void> {
	await apiClient.delete(`/users/${id}`);
}

