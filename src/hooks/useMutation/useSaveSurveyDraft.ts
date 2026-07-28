import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveSurveyProgress } from '@/services/dashboard/surveys';
import { toast } from 'sonner';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function useSaveSurveyDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSurveyFormData) => saveSurveyProgress(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('Progress saved!');
      return data;
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to save draft.');
    },
  });
}
