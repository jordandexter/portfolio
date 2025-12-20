import { create } from "zustand";

interface ModalStore {
    focusedSection: string | null;
    setFocusedSection: (id: string) => void;
}

export const useFocusedSection = create<ModalStore>((set) => ({
    focusedSection: null,
    setFocusedSection: (id: string) => { set({ focusedSection: id }) }
}))