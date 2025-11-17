import { AnimatedParagraph } from "@/components/BackgroundPreview/AnimatedParagraph"
import { Project } from "@/components/ProjectPreview/types"
import { SectionHeader } from "@/components/Section/SectionHeader"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface ProjectModalProps {
    project: Project
    onClose: () => void
}

export const ProjectModal = ({
    project,
    onClose
}: ProjectModalProps) => {
    const ref = useRef<HTMLDivElement>(null)




    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'


        return () => {
            body.style.overflow = 'visible'
        }
    }, [])




    return (
        <div ref={ref} className="sticky z-9999 top-0 w-screen h-screen bg-background relative flex flex-col md:flex-row"
            onScroll={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
            <X className="absolute top-6 right-6 h-10 w-10 cursor-pointer hover:text-white"
                onClick={onClose}
            />
            <div className="flex flex-col justify-between md:pt-0 pt-18">
                <div />
                <img src={project.image} className="md:flex hidden max-w-full fade-in rounded-tr-[25px]"
                    style={{
                        animationDelay: '600ms'
                    }} />
            </div>
            <div className="flex flex-col w-full gap-10 p-12 overflow-y-scroll max-w-200"
                style={{
                    scrollbarWidth: 'none'
                }}>
                <SectionHeader
                    heading={project.name}
                    subheading={project.subtitle}
                    parentRef={ref}
                />
                {project.description?.split('\n\n').map((paragraph, index) => {
                    return (
                        <h2 key={index} className="text-xl md:text-3xl">{paragraph}</h2>
                    )
                })}
            </div>
        </div>
    )
}