import { StateCreator } from "zustand";
import { Allergy } from "../types/general.types";

export interface AllergiesStore {
    allergies: Allergy[];
    pendingAllergies: boolean;
    setPendingAllergies: (pendingAllergies: boolean) => void;
    setAllergies: (allergies: Allergy[]) => void;
    resetAllergies: () => void;
}

export const createAllergiesStore: StateCreator<AllergiesStore> = (set) => ({
    allergies: [],
    pendingAllergies: false,
    setPendingAllergies: (pendingAllergies: boolean) => set({ pendingAllergies }),
    setAllergies: (allergies: Allergy[]) => set({ allergies }),
    resetAllergies: () => set((state) => ({ ...state, allergies: [] })),
});