import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSurvey } from '@/services/dashboard/surveys';
import { toast } from 'sonner';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function useCreateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSurveyFormData) => createSurvey(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Survey created successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to create survey. Please try again.');
    },
  });
}
