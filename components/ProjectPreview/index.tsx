import { projects } from "./constants"
import { RefObject, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Project } from "./types"
import { ProjectContainer } from "./ProjectContainer"
import { AnimatedText } from "../AnimatedText"

interface ProjectPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
    onProjectModalOpen: (project: Project) => void
}

export function ProjectPreview({
    scrollRef,
    onProjectModalOpen
}: ProjectPreviewProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacityScale = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);
    const scaleScale = useTransform(scrollYProgress, [0, 0.7], [0.5, 1]);

    return (
        <div ref={ref} className="flex max-w-[1000px] justify-center overflow-hidden flex-col">
            <AnimatedText
                scrollRef={scrollRef}
                delay={400}
            >
                <span className="text-foreground-emphasized">Here are few of my favorites.</span> These
                projects showcase not only my creativity, but also my experience working across multiple
                technologies each with a unique stack.
            </AnimatedText>

            <motion.div className="flex flex-col"
                style={{
                    opacity: opacityScale,
                    scale: scaleScale
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