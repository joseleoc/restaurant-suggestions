import { create } from "zustand";
import { AuthStore, createAuthStore } from "./auth.store";
import { ModalsStore, createModalsStore } from "./modals.store";
import { AllergiesStore, createAllergiesStore } from "./allergies.store";

export const useStore = create<AuthStore & ModalsStore & AllergiesStore>()((...a) => ({
  ...createAuthStore(...a),
  ...createModalsStore(...a),
  ...createAllergiesStore(...a),
}));
