import type { Session } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  created_at: string; // ISO timestamp
  user_name: string;
  email: string;
}

export type AuthContextType = {
  user: Profile | null;
  session: Session | null;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};