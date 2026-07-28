import { useQuery } from '@tanstack/react-query';
import { getSurveyById } from '@/services/dashboard/surveys';

export function useSurveyById(id: string | undefined) {
  return useQuery({
    queryKey: ['surveys', id],
    queryFn: async () => {
      const res = await getSurveyById(id!);
      return res.data || res;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}
