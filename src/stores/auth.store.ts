import type { User } from "../types/auth.types";
import { StateCreator } from "zustand";

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export const createAuthStore: StateCreator<AuthStore> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  resetUser: () => set((state) => ({ ...state, user: null })),
});
