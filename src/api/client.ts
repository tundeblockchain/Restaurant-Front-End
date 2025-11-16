import axios from 'axios';
import { env } from '@config/env';

export const apiClient = axios.create({
	baseURL: env.api.baseURL,
	timeout: 15000
});

apiClient.interceptors.request.use((config) => {
	// Attach auth token here if needed
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);


