import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAvatar } from '@/services/dashboard/settings';
import { toast } from 'sonner';

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { avatarUrl: string | null }) => updateAvatar(payload),
    onSuccess: () => {
      toast.success('Avatar updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast.error(error.userMessage || 'Failed to update avatar.');
    },
  });
}
