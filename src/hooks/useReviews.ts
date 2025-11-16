import { useQuery } from '@tanstack/react-query';
import type { ReviewDto } from '@models/ReviewDto';
import { mockReviews } from '@mockData/reviews';

async function getReviewsMock(): Promise<ReviewDto[]> {
	return Promise.resolve(mockReviews);
}

export function useReviews() {
	return useQuery({
		queryKey: ['reviews'],
		queryFn: getReviewsMock
	});
}


