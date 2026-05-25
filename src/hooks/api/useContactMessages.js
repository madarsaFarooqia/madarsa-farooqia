import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactMessageService } from '../../services';
import { queryKeys } from './queryKeys';

export function useContactMessagesQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.contactMessages.all(sort, limit),
    queryFn: () => contactMessageService.list(sort, limit),
    ...options,
  });
}

export function useContactMessageMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['contactMessages'] });

  const create = useMutation({
    mutationFn: (payload) => contactMessageService.create(payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => contactMessageService.delete(id),
    onSuccess: invalidate,
  });

  return { create, remove };
}
