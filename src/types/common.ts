export interface Profile {
  // id: string;
  // created_at: string; // ISO timestamp
  userName: string;
  email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  user_name: string;
  avatar_url: string;
  created_at: string;
  settings: {
    appearance: string;
    accent_color: string;
    theme_picture: string;
  };
}

export type AuthContextType = {
  user: Profile | null;
  profileData: UserProfile | null;
  signOut: () => Promise<void>;
  loading: boolean;
};