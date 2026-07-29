import { useCallback } from 'react';

export function useSignOut() {
  const signOut = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('profileData');
    window.location.href = '/login';
  }, []);

  return signOut;
}
