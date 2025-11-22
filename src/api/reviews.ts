import { apiClient } from './client';
import type { ReviewDto } from '@models/ReviewDto';

export interface ReviewsResponse {
	data: ReviewDto[];
	total: number;
	page: number;
	limit: number;
}

export interface GetReviewsParams {
	page?: number;
	limit?: number;
	productId?: string;
	orderId?: string;
	status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';
	rating?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface UpdateReviewStatusRequest {
	status: 'PUBLISHED' | 'PENDING' | 'REJECTED';
}

export async function getReviews(params?: GetReviewsParams): Promise<ReviewsResponse> {
	const res = await apiClient.get<ReviewsResponse>('/reviews', { params });
	return res.data;
}

export async function getReview(id: string): Promise<ReviewDto> {
	const res = await apiClient.get<ReviewDto>(`/reviews/${id}`);
	return res.data;
}

export async function updateReviewStatus(id: string, status: 'PUBLISHED' | 'PENDING' | 'REJECTED'): Promise<ReviewDto> {
	const res = await apiClient.put<ReviewDto>(`/reviews/${id}/status`, { status });
	return res.data;
}

export async function deleteReview(id: string): Promise<void> {
	await apiClient.delete(`/reviews/${id}`);
}

