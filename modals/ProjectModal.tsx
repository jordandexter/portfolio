import { AnimatedParagraph } from "@/components/BackgroundPreview/AnimatedParagraph"
import { Project } from "@/components/ProjectPreview/types"
import { SectionHeader } from "@/components/Section/SectionHeader"
import { X } from "lucide-react"
import { useRef } from "react"

interface ProjectModalProps {
    project: Project
    onClose: () => void
}

export const ProjectModal = ({
    project,
    onClose
}: ProjectModalProps) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className="sticky z-9999 top-0 w-screen h-screen bg-background relative flex flex-col md:flex-row"
            onScroll={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
            <X className="absolute top-6 right-6 h-10 w-10 cursor-pointer hover:text-white"
                onClick={onClose}
            />
            <div className="flex flex-col justify-between">
                <div />
                <img src={project.image} className="max-w-full fade-in rounded-tr-[25px]"
                    style={{
                        animationDelay: '600ms'
                    }} />
            </div>
            <div className="flex flex-col w-full gap-3 md:pt-45 p-12">
                <SectionHeader
                    heading={project.name}
                    subheading={project.subtitle}
                    parentRef={ref}
                />

                {project.description?.split('\n\n').map((paragraph) => {
                    return (
                        <p>{paragraph}</p>
                    )
                })}
            </div>
        </div>
    )
}