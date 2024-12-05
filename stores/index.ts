import { create } from 'zustand';
import { AuthStore, createAuthStore } from './auth.store';

export const useStore = create<AuthStore>()((...a) => ({
    ...createAuthStore(...a),
}));