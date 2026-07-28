import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/dashboard/analytics';
import type { DashboardStats } from '@/types';

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await getDashboardStats();
      return response.data as DashboardStats;
    },
    staleTime: 0,
    retry: 1,
  });
}
