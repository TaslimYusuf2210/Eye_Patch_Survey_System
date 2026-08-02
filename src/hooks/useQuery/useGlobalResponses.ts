import { useQuery } from '@tanstack/react-query';
import { getGlobalResponse } from '@/services/dashboard/responses';

interface GlobalResponseParams {
  page?: number;
  limit?: number;
  survey_id?: string;
}

export function useGlobalResponses(params?: GlobalResponseParams) {
  return useQuery({
    queryKey: ['responses', 'global', params],
    queryFn: () => getGlobalResponse(params),
    staleTime: 1 * 60 * 1000,
    retry: 1,
  });
}
