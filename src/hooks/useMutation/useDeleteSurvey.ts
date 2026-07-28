import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSurvey } from '@/services/dashboard/surveys';
import { toast } from 'sonner';

export function useDeleteSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSurvey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Survey deleted successfully.');
    },
    onError: () => {
      toast.error('Failed to delete survey.');
    },
  });
}
