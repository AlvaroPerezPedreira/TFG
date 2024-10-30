import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  filters: {
    where: "",
    adults: 1,
    children: 0,
    rooms: 1,
    checkIn: "2025-03-01",
    checkOut: "2025-03-07",
  },
  setFilters: (filters) => set({ filters }),
}));
