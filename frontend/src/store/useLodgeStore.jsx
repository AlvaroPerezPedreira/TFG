import { create } from "zustand";

export const useLodgeStore = create((set) => ({
  lodges: [],
  setLodges: (lodges) => set({ lodges }),
  addLodge: (lodge) => set((state) => ({ lodges: [...state.lodges, lodge] })),
}));
