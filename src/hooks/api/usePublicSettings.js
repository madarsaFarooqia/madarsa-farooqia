import { useQuery } from '@tanstack/react-query';
import { publicAppService } from '../../services';
import { queryKeys } from './queryKeys';

export function usePublicSettingsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.public.settings,
    queryFn: () => publicAppService.getSettings(),
    ...options,
  });
}
