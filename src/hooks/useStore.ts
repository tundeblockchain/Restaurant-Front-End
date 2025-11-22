import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStore, updateStore } from '@api/store';
import type { UpdateStoreRequest } from '@api/store';

export function useStore() {
	return useQuery({
		queryKey: ['store'],
		queryFn: getStore
	});
}

export function useUpdateStore() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: UpdateStoreRequest) => updateStore(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['store'] });
		}
	});
}

