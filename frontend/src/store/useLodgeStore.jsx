import { create } from "zustand";

export const useLodgeStore = create((set, get) => ({
  lodges: [],
  setLodges: (lodges) => set({ lodges }),
  addLodge: (lodge) => set((state) => ({ lodges: [...state.lodges, lodge] })),
  addLodges: (lodges) =>
    set((state) => ({ lodges: [...state.lodges, ...lodges] })),
  getLodge: (email) => {
    const state = get();
    return state.lodges.find((lodge) => lodge.lodge_email === email);
  },
  removeLodge: (email) =>
    set((state) => ({
      lodges: state.lodges.filter((lodge) => lodge.lodge_email !== email),
    })),
}));
