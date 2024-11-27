import { create } from "zustand";

export const useBannedUsersStore = create((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  addUsers: (users) => set((state) => ({ users: [...state.users, ...users] })),
  getUser: (email) => {
    const state = get();
    return state.users.find((user) => user.email === email);
  },
  removeUser: (email) => {
    set((state) => ({
      users: state.users.filter((user) => user.email !== email),
    }));
  },
}));
