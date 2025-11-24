import { useModalStore } from "@/stores/modalStore"
import { ProjectModal } from "./ProjectModal"
import { ContactUsModal } from "./ContactUsModal"

export const ModalContainer = () => {
    const {
        projectModalOpen,
        setProjectModalOpen,
        contactFormOpen,
        setContactFormModalOpen
    } = useModalStore()

    return (
        <>
            {
                projectModalOpen.open && projectModalOpen.project &&
                <ProjectModal project={projectModalOpen.project} onClose={() => setProjectModalOpen({ open: false, project: null })} />
            }
            {
                contactFormOpen &&
                <ContactUsModal onClose={() => setContactFormModalOpen(false)} />
            }
        </>
    )
}