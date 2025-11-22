import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@api/users';
import type { UserDto } from '@models/UserDto';

export function useUsers(params?: { page?: number; limit?: number; role?: string; search?: string; status?: 'ACTIVE' | 'INACTIVE' }) {
	return useQuery({
		queryKey: ['users', params],
		queryFn: () => getUsers(params),
		select: (data) => data.data // Extract the data array from the paginated response
	});
}


