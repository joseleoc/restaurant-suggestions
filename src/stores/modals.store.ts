import { StateCreator } from "zustand";

export interface ModalsStore {
    completeProfileModalIsOpen: boolean;
    setCompleteProfileModal: (open: boolean) => void;
}

export const createModalsStore: StateCreator<ModalsStore> = (set) => ({
    completeProfileModalIsOpen: false,
    setCompleteProfileModal: (open: boolean) =>
        set({ completeProfileModalIsOpen: open }),
});
