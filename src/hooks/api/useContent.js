import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services';
import { queryKeys } from './queryKeys';

export function useQuotesQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.content.quotes,
    queryFn: () => contentService.list(),
    ...options,
  });
}

export function useRandomQuoteQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.content.randomQuote,
    queryFn: () => contentService.random(),
    ...options,
  });
}

export function useQuotesByTypeQuery(type, options = {}) {
  return useQuery({
    queryKey: queryKeys.content.quotesByType(type),
    queryFn: () => contentService.byType(type),
    enabled: Boolean(type),
    ...options,
  });
}
