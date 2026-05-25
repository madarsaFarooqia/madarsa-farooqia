import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../../services';
import { queryKeys } from './queryKeys';

export function useEventsQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.events.all(sort, limit),
    queryFn: () => eventService.list(sort, limit),
    ...options,
  });
}

export function useEventsFilterQuery(filters, sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: [...queryKeys.events.all(sort, limit), filters],
    queryFn: () => eventService.filter(filters, sort, limit),
    ...options,
  });
}

export function useEventMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['events'] });

  const create = useMutation({
    mutationFn: (payload) => eventService.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => eventService.update(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => eventService.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
