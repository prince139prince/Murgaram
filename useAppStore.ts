import { create } from 'zustand';
import { User } from 'firebase/auth';

interface MurgaRamUser {
  uid: string;
  murgaRamId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  online: boolean;
  lastSeen: string;
  createdAt: string;
}

interface AppState {
  user: (User & MurgaRamUser) | null;
  setUser: (user: (User & MurgaRamUser) | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set({ loading }),
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),
}));