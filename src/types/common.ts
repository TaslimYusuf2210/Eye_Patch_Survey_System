import type { Session } from "@supabase/supabase-js";

export interface Profile {
  // id: string;
  // created_at: string; // ISO timestamp
  userName: string;
  email: string;
}

export type AuthContextType = {
  user: Profile | null;
  signOut: () => Promise<void>;
};