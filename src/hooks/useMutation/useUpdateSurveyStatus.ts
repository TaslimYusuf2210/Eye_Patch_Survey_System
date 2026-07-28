import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSurveyStatus } from '@/services/dashboard/surveys';
import { toast } from 'sonner';

export function useUpdateSurveyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateSurveyStatus(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['surveys', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success(`Survey status changed to ${variables.status}.`);
    },
    onError: () => {
      toast.error('Failed to update survey status.');
    },
  });
}
