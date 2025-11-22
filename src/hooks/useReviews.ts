import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@api/reviews';
import type { ReviewDto } from '@models/ReviewDto';

export function useReviews(params?: { page?: number; limit?: number; productId?: string; orderId?: string; status?: 'PUBLISHED' | 'PENDING' | 'REJECTED'; rating?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }) {
	return useQuery({
		queryKey: ['reviews', params],
		queryFn: () => getReviews(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


