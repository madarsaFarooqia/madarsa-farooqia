import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignService } from '../../services';
import { queryKeys } from './queryKeys';

export function useCampaignsQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.campaigns.all(sort, limit, null),
    queryFn: () => campaignService.list(sort, limit),
    ...options,
  });
}

export function useCampaignsFilterQuery(filters, sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.campaigns.all(sort, limit, filters),
    queryFn: () => campaignService.filter(filters, sort, limit),
    ...options,
  });
}

export function useCampaignQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.campaigns.detail(id),
    queryFn: () => campaignService.getById(id),
    enabled: Boolean(id),
    ...options,
  });
}

export function useCampaignMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['campaigns'] });

  const create = useMutation({
    mutationFn: (payload) => campaignService.create(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }) => campaignService.update(id, payload),
    onSuccess: invalidate,
  });
  const close = useMutation({
    mutationFn: (id) => campaignService.close(id),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id) => campaignService.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, close, remove };
}
