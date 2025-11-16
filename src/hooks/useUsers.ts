import { useQuery } from '@tanstack/react-query';
import type { UserDto } from '@models/UserDto';
import { mockUsers } from '@mockData/users';

async function getUsersMock(): Promise<UserDto[]> {
	return Promise.resolve(mockUsers);
}

export function useUsers() {
	return useQuery({
		queryKey: ['users'],
		queryFn: getUsersMock
	});
}


