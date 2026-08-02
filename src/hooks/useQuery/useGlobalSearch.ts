import { useQuery } from '@tanstack/react-query';
import { globalSearch } from '@/services/dashboard/surveys';

interface SearchParams {
  q: string;
  type?: 'surveys' | 'responses' | 'all';
  page?: number;
  limit?: number;
}

export function useGlobalSearch(params: SearchParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => globalSearch(params),
    enabled: !!params.q,
    staleTime: 0,
    retry: 1,
  });
}
