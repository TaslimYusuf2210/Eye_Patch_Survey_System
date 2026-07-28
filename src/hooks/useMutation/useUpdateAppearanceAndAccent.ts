import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAppearanceAndAccent } from '@/services/dashboard/settings';
import { toast } from 'sonner';

export function useUpdateAppearanceAndAccent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { appearance: string; accent_color: string }) =>
      updateAppearanceAndAccent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Appearance settings updated successfully.');
    },
    onError: (error: any) => {
      toast.error(error?.userMessage || 'Failed to update appearance settings.');
    },
  });
}
