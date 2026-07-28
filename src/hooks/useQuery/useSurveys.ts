import { useQuery } from '@tanstack/react-query';
import { getSurveys } from '@/services/dashboard/surveys';

interface SurveysParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: string;
}

export function useSurveys(params?: SurveysParams) {
  return useQuery({
    queryKey: ['surveys', params],
    queryFn: () => getSurveys(params),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}
