import { create } from "zustand";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
};

type AuthStore = {
  user: User | null;
  isAllowed: boolean;
  setUser: (user: User | null) => void;
  setIsAllowed: (isAllowed: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAllowed: false,
  setUser: (user) => set({ user }),
  setIsAllowed: (isAllowed) => set({ isAllowed }),
}));