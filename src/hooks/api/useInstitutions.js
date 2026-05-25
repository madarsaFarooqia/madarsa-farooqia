import { useQuery } from '@tanstack/react-query';
import { institutionService } from '../../services';
import { queryKeys } from './queryKeys';

export function useInstitutionsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.institutions.all,
    queryFn: () => institutionService.list(),
    ...options,
  });
}

export function useInstitutionQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.institutions.detail(id),
    queryFn: () => institutionService.getById(id),
    enabled: Boolean(id),
    ...options,
  });
}
