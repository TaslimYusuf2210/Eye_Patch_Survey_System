import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/authService';
import type { LoginFormData } from '@/types/auth';

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginFormData) => login(payload),
  });
}
