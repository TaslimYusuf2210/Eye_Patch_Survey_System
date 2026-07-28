import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserName } from '@/services/dashboard/settings';
import { toast } from 'sonner';

export function useUpdateUserName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { userName: string }) => updateUserName(payload),
    onSuccess: () => {
      toast.success('Username updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast.error(error.userMessage || 'Failed to update username.');
    },
  });
}
