import { create } from "zustand";

type Store = {
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
};

export const useSaving = create<Store>()((set) => ({
  isSaving: false,
  setIsSaving: (value) => set(() => ({ isSaving: value })),
}));
