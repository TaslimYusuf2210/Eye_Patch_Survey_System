import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Profile, AuthContextType, UserProfile } from "@/types/common";
import {getMe} from "@/services/authService"
import {getProfile} from "@/services/dashboard/settings"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  async function getUserDataAndProfile() {
        setLoading(true);
        // Get current user
        try {
          const userDataExists = sessionStorage.getItem('user') !== null;
          const userProfileDataExists = sessionStorage.getItem('profileData') !== null;
          if (userDataExists) {
            console.log("User data found in session storage.", userDataExists);
            setUser(JSON.parse(sessionStorage.getItem('user')!));
          }
          if(!userDataExists) {
            const response = await getMe();
            console.log("Get Me response:", response.data);
            const userData = {
                userName: response.data.data.userName,
                email: response.data.data.email,
            }
            sessionStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            console.log("User data fetched successfully:", userData);
          }
          if (userProfileDataExists) {
            console.log("User profile data found in session storage.", userProfileDataExists);
            setProfileData(JSON.parse(sessionStorage.getItem('profileData')!));
          }
          if(!userProfileDataExists) {
            const profileResponse = await getProfile();
            console.log("Get Profile response:", profileResponse);
            sessionStorage.setItem('profileData', JSON.stringify(profileResponse.data));
            setProfileData(profileResponse.data);
            console.log("User profile data fetched successfully:", profileResponse);
          }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data. Please try again.");
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
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
