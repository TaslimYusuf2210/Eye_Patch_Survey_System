import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, UserProfile } from "@/types/common";
import {getProfile} from "@/services/dashboard/settings"
import { toast } from "sonner"
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  function syncThemeSettings(settings: { appearance?: string; accent_color?: string; theme_picture?: string }) {
    if (settings?.appearance && settings?.accent_color && settings?.theme_picture) {
      localStorage.setItem('survey-theme-appearance', settings.appearance);
      localStorage.setItem('survey-theme-accent', settings.accent_color);
      localStorage.setItem('survey-theme-picture', settings.theme_picture);
      window.dispatchEvent(new CustomEvent('theme-synced'));
    }
  }

  async function getUserDataAndProfile() {
        setLoading(true);
        // Get current user
        try {
          const userProfileDataExists = sessionStorage.getItem('profileData') !== null;
          if (userProfileDataExists) {
            console.log("User profile data found in session storage.", userProfileDataExists);
            const existing = JSON.parse(sessionStorage.getItem('profileData')!);
            setProfileData(existing);
            syncThemeSettings(existing.settings);
          }
          if(!userProfileDataExists) {
            const profileResponse = await getProfile();
            console.log("Get Profile response:", profileResponse);
            sessionStorage.setItem('profileData', JSON.stringify(profileResponse.data));
            setProfileData(profileResponse.data);
            console.log("User profile data fetched successfully:", profileResponse.data, profileResponse.data.settings);
            syncThemeSettings(profileResponse.data.settings);
          }
        } catch (error: any) {
            console.error("Error fetching user data:", error);
            toast.error(error.userMessage || "Error fetching user data. Please try again.");
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
    }

  // async function getProfileData() {

  useEffect(() => {
    // Get initial session
    getUserDataAndProfile();
  }, []);


  const signOut = async () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('profileData');
    setProfileData(null);
    window.location.href = '/login';
  };

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
