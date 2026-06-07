import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../services';
import { queryKeys } from './queryKeys';

export function useMyDonationsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.donations.my,
    queryFn: () => donationService.getMy(),
    ...options,
  });
}

export function useAdminDonationsQuery(sort = '-created_date', limit = 500, options = {}) {
  return useQuery({
    queryKey: queryKeys.donations.admin(sort, limit),
    queryFn: () => donationService.listAdmin(sort, limit),
    ...options,
  });
}

export function useDonationStatusQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.donations.status(id),
    queryFn: () => donationService.getStatus(id),
    enabled: Boolean(id),
    ...options,
  });
}

export function useDonationMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['donations'] });
    queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
  };

  const initiateGuest = useMutation({
    mutationFn: (payload) => donationService.initiateGuest(payload),
    onSuccess: invalidate,
  });
  const initiate = useMutation({
    mutationFn: (payload) => donationService.initiate(payload),
    onSuccess: invalidate,
  });

  return { initiateGuest, initiate };
}
