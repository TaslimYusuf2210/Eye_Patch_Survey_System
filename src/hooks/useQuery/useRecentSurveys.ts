import { useQuery } from '@tanstack/react-query';
import { getRecentSurveys } from '@/services/dashboard/analytics';
import type { RecentSurvey } from '@/types';

export function useRecentSurveys(limit: number = 5) {
  return useQuery<RecentSurvey[]>({
    queryKey: ['dashboard', 'recent-surveys', limit],
    queryFn: async () => {
      const response = await getRecentSurveys(limit);
      return response.data.data as RecentSurvey[];
    },
    staleTime: 0,
    retry: 1,
  });
}
