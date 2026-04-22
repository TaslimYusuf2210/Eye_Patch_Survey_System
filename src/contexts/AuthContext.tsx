import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  created_at: string; // ISO timestamp
  user_name: string;
  email: string;
}

type AuthContextType = {
  user: Profile | null;
  session: Session | null;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  async function getUserData() {
        // Get current user
        const { data, error } = await supabase.auth.getUser();
         if (error) throw error;
        const user = data.user;
        if (!user) throw new Error("User not logged in");
        // Fetch Profile
        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        if (profileError) throw profileError;
        setUser(profile)
    }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // setUser(session?.user ?? null);
    });

    // Listen for auth changes (login, logout, sign up, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // setUser(session?.user ?? null);
    });

    // Get current user data
    getUserData()

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userName: string) => {
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      throw new Error(checkError.message);
    }

    if (existingUser) {
      throw new Error("User already exist");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
        },
      },
    });

        if (data.user) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          user_name: userName,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }
    }
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signUp,
        signIn,
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
