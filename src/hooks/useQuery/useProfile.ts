import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/dashboard/settings';
import type { UserProfile } from '@/types/common';

export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data as UserProfile;
    },
    staleTime: Infinity,
    retry: 1,
  });
}
