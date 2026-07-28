import { useQuery } from '@tanstack/react-query';
import { getResponseById } from '@/services/dashboard/responses';

interface SurveyResponsesParams {
  id: string;
  page?: number;
  limit?: number;
  sort_by?: 'completed_at' | 'time_taken_sec';
  order?: 'asc' | 'desc';
}

export function useSurveyResponses({ id, ...queryParams }: SurveyResponsesParams) {
  return useQuery({
    queryKey: ['responses', 'survey', id, queryParams],
    queryFn: () => getResponseById({ id, ...queryParams }),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    retry: 1,
  });
}
