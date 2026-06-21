import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, UserProfile } from "@/types/common";
import {getProfile} from "@/services/dashboard/settings"
import { toast } from "sonner"
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  async function getUserDataAndProfile() {
        setLoading(true);
        // Get current user
        try {
          const userProfileDataExists = sessionStorage.getItem('profileData') !== null;
          if (userProfileDataExists) {
            console.log("User profile data found in session storage.", userProfileDataExists);
            setProfileData(JSON.parse(sessionStorage.getItem('profileData')!));
          }
          if(!userProfileDataExists) {
            const profileResponse = await getProfile();
            console.log("Get Profile response:", profileResponse);
            sessionStorage.setItem('profileData', JSON.stringify(profileResponse.data));
            setProfileData(profileResponse.data);
            console.log("User profile data fetched successfully:", profileResponse.data, profileResponse.data.settings);
            const themeAndAppearanceExists = profileResponse.data.settings.appearance && profileResponse.data.settings.accent_color && profileResponse.data.settings.theme_picture;
            if(themeAndAppearanceExists) {
              console.log("User theme and appearance settings found in profile data:", profileResponse.data.settings);
              sessionStorage.setItem('survey_theme_appearance', JSON.stringify({
                appearance: profileResponse.data.settings.appearance,
              }));
              sessionStorage.setItem('survey_theme_picture', JSON.stringify({
                appearance: profileResponse.data.settings.appearance,
              }));
              sessionStorage.setItem('survey_theme_accent', JSON.stringify({
                appearance: profileResponse.data.settings.appearance,
              }));
              
            }
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
