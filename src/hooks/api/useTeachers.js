import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherService } from '../../services';
import { queryKeys } from './queryKeys';

export function useTeachersQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.teachers.all(sort, limit),
    queryFn: () => teacherService.list(sort, limit),
    ...options,
  });
}

export function useTeachersFilterQuery(filters, sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: [...queryKeys.teachers.all(sort, limit), filters],
    queryFn: () => teacherService.filter(filters, sort, limit),
    ...options,
  });
}

export function useTeacherMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['teachers'] });

  const create = useMutation({
    mutationFn: (payload) => teacherService.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => teacherService.update(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => teacherService.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
