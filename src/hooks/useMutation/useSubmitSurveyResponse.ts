import { useMutation } from '@tanstack/react-query';
import { submitSurveyResponse } from '@/services/surveyResponse';
import { toast } from 'sonner';
import type { SubmitResponsePayload } from '@/services/surveyResponse';

export function useSubmitSurveyResponse() {
  return useMutation({
    mutationFn: ({ surveyId, payload }: { surveyId: string; payload: SubmitResponsePayload }) =>
      submitSurveyResponse(surveyId, payload),
    onSuccess: () => {
      toast.success('Your response has been submitted. Thank you!');
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to submit response.');
    },
  });
}
