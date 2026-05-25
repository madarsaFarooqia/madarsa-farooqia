import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService } from '../../services';
import { queryKeys } from './queryKeys';

export function useStudentsQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.students.all(sort, limit),
    queryFn: () => studentService.list(sort, limit),
    ...options,
  });
}

export function useStudentsFilterQuery(filters, sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: [...queryKeys.students.all(sort, limit), filters],
    queryFn: () => studentService.filter(filters, sort, limit),
    ...options,
  });
}

export function useStudentMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['students'] });

  const create = useMutation({
    mutationFn: (payload) => studentService.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => studentService.update(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => studentService.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
