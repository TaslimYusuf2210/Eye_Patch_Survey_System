import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Profile, AuthContextType } from "@/types/common";
import {getMe} from "@/services/authService"
import { toast } from "sonner"
// import checkToken from "@/lib/authHelpers";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);(null);
  const [loading, setLoading] = useState(false);

  async function getUserData() {
        setLoading(true);
        // Get current user
        try {
          const userDataExists = sessionStorage.getItem('user') !== null;
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
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data. Please try again.");
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
    }

  useEffect(() => {
    // Get initial session
    getUserData();
  }, []);


  const signOut = async () => {
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
