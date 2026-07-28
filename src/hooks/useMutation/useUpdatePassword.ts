import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword } from '@/services/authService';
import { toast } from 'sonner';

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      updatePassword(payload),
    onSuccess: () => {
      toast.success('Password updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast.error(error.userMessage || 'Failed to update password.');
    },
  });
}
