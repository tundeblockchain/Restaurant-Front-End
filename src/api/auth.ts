import { apiClient } from './client';
import type { UserDto } from '@models/UserDto';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
	storeName: string;
}

export interface GoogleLoginRequest {
	idToken: string;
}

export interface AuthResponse {
	token: string;
	user: UserDto;
	store?: any; // StoreDto if available
}

export async function login(email: string, password: string): Promise<AuthResponse> {
	const res = await apiClient.post<AuthResponse>('/auth/login', { email, password });
	if (res.data.token) {
		localStorage.setItem('auth_token', res.data.token);
	}
	return res.data;
}

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
	const res = await apiClient.post<AuthResponse>('/auth/login/google', { idToken });
	if (res.data.token) {
		localStorage.setItem('auth_token', res.data.token);
	}
	return res.data;
}

export async function register(email: string, password: string, name: string, storeName: string): Promise<AuthResponse> {
	const res = await apiClient.post<AuthResponse>('/auth/register', {
		email,
		password,
		name,
		storeName
	});
	if (res.data.token) {
		localStorage.setItem('auth_token', res.data.token);
	}
	return res.data;
}

export async function logout(): Promise<void> {
	await apiClient.post('/auth/logout');
	localStorage.removeItem('auth_token');
}

export async function getCurrentUser(): Promise<UserDto> {
	const res = await apiClient.get<UserDto>('/auth/me');
	return res.data;
}

