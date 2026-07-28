import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSurveyProgress } from '@/services/dashboard/surveys';
import { toast } from 'sonner';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function useUpdateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateSurveyFormData }) =>
      updateSurveyProgress(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['surveys', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('Survey updated!');
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to update survey.');
    },
  });
}
