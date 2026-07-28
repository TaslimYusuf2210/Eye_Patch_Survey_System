import { useQuery } from '@tanstack/react-query';
import { getGlobalParticipants } from '@/services/dashboard/participants';

interface GlobalParticipantsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useGlobalParticipants(params?: GlobalParticipantsParams) {
  return useQuery({
    queryKey: ['participants', 'global', params],
    queryFn: () => getGlobalParticipants(params),
    staleTime: 1 * 60 * 1000,
    retry: 1,
  });
}
