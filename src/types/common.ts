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