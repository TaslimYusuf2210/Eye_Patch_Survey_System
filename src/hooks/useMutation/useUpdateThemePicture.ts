import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateThemePicture } from '@/services/dashboard/settings';
import { toast } from 'sonner';

export function useUpdateThemePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { theme_picture: string }) => updateThemePicture(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Theme picture updated successfully.');
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to update theme picture.');
    },
  });
}
