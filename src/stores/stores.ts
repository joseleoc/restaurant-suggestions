import { create } from "zustand";
import { AuthStore, createAuthStore } from "./auth.store";
import { ModalsStore, createModalsStore } from "./modals.store";
import { AllergiesStore, createAllergiesStore } from "./allergies.store";
import { createRestaurantsStore, RestaurantsStore } from "./restaurants.store";
import { createPlatesStore, PlatesStore } from "./plates.store";

export const useStore = create<
  AuthStore & ModalsStore & AllergiesStore & RestaurantsStore & PlatesStore
>()((...a) => ({
  ...createAuthStore(...a),
  ...createModalsStore(...a),
  ...createAllergiesStore(...a),
  ...createRestaurantsStore(...a),
  ...createPlatesStore(...a),
}));
