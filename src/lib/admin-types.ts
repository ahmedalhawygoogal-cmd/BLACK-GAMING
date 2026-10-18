export type AdminGame = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string | null;
  icon: string | null;
  banner_url: string | null;
  is_active: boolean | null;
  created_at: string | null;
};
