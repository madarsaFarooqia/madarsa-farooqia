import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEntityService } from '../../services';
import { queryKeys } from './queryKeys';

export function useEntityQuery(entityName, sortField = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.entity(entityName, sortField),
    queryFn: () => getEntityService(entityName).list(sortField, limit),
    ...options,
  });
}

export function useEntityMutations(entityName) {
  const queryClient = useQueryClient();
  const entity = getEntityService(entityName);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['entity', entityName] });

  const create = useMutation({
    mutationFn: (payload) => entity.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => entity.update(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => entity.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
