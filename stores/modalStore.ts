import { Project } from "@/components/ProjectPreview/types";
import { create } from "zustand";

interface ProjectModalProps {
    open: boolean;
    project: Project | null;
}

// Simple zustand store for modal state management
interface ModalStore {
    projectModalOpen: ProjectModalProps;
    contactFormOpen: boolean;
    setProjectModalOpen: (props: ProjectModalProps) => void;
    setContactFormModalOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    projectModalOpen: { open: false, project: null },
    contactFormOpen: false,
    setProjectModalOpen: (props: ProjectModalProps) => set({ projectModalOpen: props }),
    setContactFormModalOpen: (open: boolean) => set({ contactFormOpen: open })
}))