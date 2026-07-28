import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/authService';
import type { SignUpFormData } from '@/types/auth';

export function useSignUp() {
  return useMutation({
    mutationFn: (payload: SignUpFormData) =>
      signUp({
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
      }),
  });
}
