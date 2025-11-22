import axios from 'axios';
import { env } from '@config/env';

export const apiClient = axios.create({
	baseURL: env.api.baseURL,
	timeout: 15000
});

apiClient.interceptors.request.use((config) => {
	// Attach auth token from localStorage
	const token = localStorage.getItem('auth_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle 401 errors by clearing token and redirecting to login
		if (error.response?.status === 401) {
			localStorage.removeItem('auth_token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);


