import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from '@/services/dashboard/settings';
import { toast } from 'sonner';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      toast.success('Account deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      window.location.href = '/signup';
    },
    onError: (error: any) => {
      toast.error(error.userMessage || 'Failed to delete account.');
    },
  });
}
