import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, UserProfile } from "@/types/common";
import { useProfile } from "@/hooks/useQuery";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  const {
    data: fetchedProfile,
    isLoading: queryLoading,
    isError,
    error,
  } = useProfile();

  function syncThemeSettings(settings: { appearance?: string; accent_color?: string; theme_picture?: string }) {
    if (settings?.appearance && settings?.accent_color && settings?.theme_picture) {
      localStorage.setItem('survey-theme-appearance', settings.appearance);
      localStorage.setItem('survey-theme-accent', settings.accent_color);
      localStorage.setItem('survey-theme-picture', settings.theme_picture);
      window.dispatchEvent(new CustomEvent('theme-synced'));
    }
  }

  // Hydrate from sessionStorage on mount (instant, no loading)
  useEffect(() => {
    const existing = sessionStorage.getItem('profileData');
    if (existing) {
      const parsed = JSON.parse(existing) as UserProfile;
      setProfileData(parsed);
      syncThemeSettings(parsed.settings);
      setLoading(false);
    }
  }, []);

  // When TanStack Query returns fresh data, update state & sessionStorage
  useEffect(() => {
    if (fetchedProfile) {
      sessionStorage.setItem('profileData', JSON.stringify(fetchedProfile));
      setProfileData(fetchedProfile);
      syncThemeSettings(fetchedProfile.settings);
      setLoading(false);
    }
  }, [fetchedProfile]);

  // Handle error case — only show toast if no cached data
  useEffect(() => {
    if (isError) {
      const cached = sessionStorage.getItem('profileData');
      if (!cached) {
        const errorMessage = (error as any)?.userMessage || "Error fetching user data. Please try again.";
        console.error("Error fetching user data:", error);
        toast.error(errorMessage);
      }
      setLoading(false);
    }
  }, [isError, error]);

  // Once query settles and we haven't resolved loading yet
  useEffect(() => {
    if (!queryLoading && profileData === null && !sessionStorage.getItem('profileData')) {
      setLoading(false);
    }
  }, [queryLoading, profileData]);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('profileData');
    setProfileData(null);
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profileData,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
