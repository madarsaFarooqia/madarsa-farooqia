import { useQuery } from '@tanstack/react-query';
import { statsService } from '../../services';
import { queryKeys } from './queryKeys';

export function useDashboardStatsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.stats.dashboard,
    queryFn: () => statsService.getDashboard(),
    ...options,
  });
}

export function useAdminStatsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.stats.admin,
    queryFn: () => statsService.getAdmin(),
    ...options,
  });
}

export function useVideosQuery(limit = 6, options = {}) {
  return useQuery({
    queryKey: queryKeys.stats.videos(limit),
    queryFn: () => statsService.getVideos(limit),
    ...options,
  });
}
