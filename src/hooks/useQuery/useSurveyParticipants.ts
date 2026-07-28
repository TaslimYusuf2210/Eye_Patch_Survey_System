import { useQuery } from '@tanstack/react-query';
import { getParticipantsBySurveyId } from '@/services/dashboard/participants';

interface SurveyParticipantsParams {
  id: string;
  page?: number;
  limit?: number;
  search?: string;
}

export function useSurveyParticipants({ id, ...queryParams }: SurveyParticipantsParams) {
  return useQuery({
    queryKey: ['participants', 'survey', id, queryParams],
    queryFn: () => getParticipantsBySurveyId({ id, ...queryParams }),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    retry: 1,
  });
}
