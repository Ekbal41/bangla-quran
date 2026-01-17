import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuranStore {
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  increaseArabicFont: () => void;
  decreaseArabicFont: () => void;
  resetArabicFont: () => void;
}

export const useQuranStore = create<QuranStore>()(
  persist(
    (set) => ({
      arabicFontSize: 28,
      setArabicFontSize: (size) =>
        set({ arabicFontSize: Math.min(40, Math.max(20, size)) }),
      increaseArabicFont: () =>
        set((state) => ({
          arabicFontSize: Math.min(40, state.arabicFontSize + 2),
        })),
      decreaseArabicFont: () =>
        set((state) => ({
          arabicFontSize: Math.max(20, state.arabicFontSize - 2),
        })),
      resetArabicFont: () => set({ arabicFontSize: 28 }),
    }),
    {
      name: "user-preferences",
    },
  ),
);
