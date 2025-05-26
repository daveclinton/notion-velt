import { create } from "zustand";

type Store = {
  title: string;
  setTitle: (value: string) => void;
};

export const useTitle = create<Store>()((set) => ({
  title: "",
  setTitle: (value) => set(() => ({ title: value })),
}));
