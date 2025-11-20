import { ArrowRight, Loader2, WindIcon } from "lucide-react"
import { projects } from "./constants"
import { useState, RefObject, useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"
import { Project } from "./types"
import { ProjectContainer } from "./ProjectContainer"
import { SectionHeader } from "../Section/SectionHeader"

interface ProjectPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
    onProjectModalOpen: (project: Project) => void
}

export function ProjectPreview({
    scrollRef,
    onProjectModalOpen
}: ProjectPreviewProps) {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        if (!scrollRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [scrollRef, triggerRef])

    const opacityScale = useTransform(scrollYProgress, [0.05, 0.10], ["0%", "100%"]);
    return (
        <div className="flex max-w-[1000px] justify-center overflow-hidden flex-col">
            <div className="flex w-full justify-start">
                {animationTrigger &&
                    <h1 className="text-foreground max-w-[500px] fade-in text-xl text-left font-bold pb-6 fade-in"
                        style={{
                            animationDelay: '500ms'
                        }}><span className="text-foreground-emphasized">Here are few of my favorites.</span> These
                        projects showcase not only my creativity, but also my experience working across multiple
                        technologies each with a unique stack.
                    </h1>
                }
            </div>
            <div ref={triggerRef} className="flex w-full h-0" />
            <motion.div className="flex flex-col"
                style={{
                    opacity: opacityScale
                }}>
                <div className="flex flex-row flex-wrap">
                    <ProjectContainer
                        project={projects[0]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className={'py-3 md:pr-3'}
                        objectPosition="object-top"
                        variant='lg' />
                    <ProjectContainer
                        project={projects[1]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className="py-3 md:pl-3"
                        objectPosition="object-center"
                        variant='sm' />
                </div>

                <div className="flex flex-row flex-wrap">
                    <ProjectContainer
                        project={projects[2]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className="py-3 md:pr-3"
                        objectPosition="object-center"
                        variant='sm' />
                    <ProjectContainer
                        project={projects[3]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className="py-3 md:pl-3"
                        objectPosition="object-center"
                        variant='lg' />
                </div>

                <div className="flex flex-row flex-wrap">
                    <ProjectContainer
                        project={projects[4]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className="py-3 md:pr-3"
                        objectPosition="object-center"
                        variant='lg' />
                    <ProjectContainer
                        project={projects[5]}
                        scrollRef={scrollRef}
                        onProjectModalOpen={onProjectModalOpen}
                        className="py-3 md:pl-3"
                        objectPosition="object-left"
                        variant='sm' />
                </div>
            </motion.div>




        </div>
    )
}