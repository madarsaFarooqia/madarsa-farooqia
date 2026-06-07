import { useQuery } from '@tanstack/react-query';
import { http } from '../../services/http';
import { queryKeys } from './queryKeys';

export function useAdminUsersQuery(options = {}) {
  return useQuery({
    queryKey: [...queryKeys.auth.me, 'admin', 'users'],
    queryFn: () => http.get('/auth/admin/users'),
    ...options,
  });
}
