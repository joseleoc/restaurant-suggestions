import { StateCreator } from "zustand";
import { Plate } from "../types/general.types";

export interface PlatesStore {
    plates: Plate[];
    setPlates: (plates: Plate[]) => void;
    resetPlates: () => void;
}


export const createPlatesStore: StateCreator<PlatesStore> = (set: any) => ({
    plates: [],
    setPlates: (plates: Plate[]) => set({ plates }),
    resetPlates: () => set({ plates: [] }),
});