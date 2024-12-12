import { StateCreator } from "zustand";
import { Restaurant } from "../types/general.types";

export interface RestaurantsStore {
    recommendedRestaurants: Restaurant[];
    setRecommendedRestaurants: (recommendedRestaurants: Restaurant[]) => void;
}

export const createRestaurantsStore: StateCreator<RestaurantsStore> = (
    set,
) => ({
    recommendedRestaurants: [],
    setRecommendedRestaurants: (recommendedRestaurants: Restaurant[]) =>
        set({ recommendedRestaurants }),
});
