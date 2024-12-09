import { create } from "zustand";
import { AuthStore, createAuthStore } from "./auth.store";
import { ModalsStore, createModalsStore } from "./modals.store";

export const useStore = create<AuthStore & ModalsStore>()((...a) => ({
  ...createAuthStore(...a),
  ...createModalsStore(...a),
}));
