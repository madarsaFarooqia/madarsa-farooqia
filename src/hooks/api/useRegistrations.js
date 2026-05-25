import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { registrationService } from '../../services';
import { queryKeys } from './queryKeys';

export function useRegistrationsQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.registrations.all(sort, limit),
    queryFn: () => registrationService.list(sort, limit),
    ...options,
  });
}

export function useRegistrationMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['registrations'] });

  const create = useMutation({
    mutationFn: (payload) => registrationService.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => registrationService.update(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => registrationService.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
