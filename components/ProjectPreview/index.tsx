import { ArrowRight } from "lucide-react"
import { projects } from "./constants"
import { useState, RefObject, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ProjectPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

interface Project {
    name: string,
    subtitle: string,
    image: string
}

export function ProjectPreview({ scrollRef }: ProjectPreviewProps) {
    const [hoveredItem, setHoveredItem] = useState<Project | null>(projects[0])

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });
    const opacityScale = useTransform(scrollYProgress, [0.1, 0.2], [0.6, 1]);

    return (
        <motion.div className="flex flex-col md:flex-row gap-10 w-full"
            style={{
                opacity: opacityScale,
            }}>
            <motion.div className={`flex min-h-[400px] md:w-[50%] max-h-[468px] bg-background overflow-hidden rounded-[25px] justify-center relative`}
                style={{
                    scale: opacityScale
                }}>
                {projects.map((project) => {
                    return (
                        <img className={`${hoveredItem === project ? 'z-1 opacity-100' : 'z-0 opacity-0'} transition-all duration-300 absolute h-full w-full`} src={project.image}></img>
                    )
                })}
            </motion.div>

            <div className="flex flex-col md:w-[50%] border-t-1 border-foreground">
                {projects.map((project) => {
                    return (
                        <div key={project.name} className="flex flex-row py-5 justify-between transition-all duration-300 hover:text-primary hover:font-bold cursor-pointer hover:border-primary border-foreground w-full border-b-1"
                            onMouseEnter={() => { setHoveredItem(project) }}
                            onMouseLeave={() => { setHoveredItem(projects[0]) }}
                            onClick={() => setHoveredItem(project)}>
                            <div className="flex flex-row gap-2 justify-center items-center overflow-hidden">
                                <ArrowRight className={`transition-all duration-300 ${hoveredItem === project ? '' : 'w-0'} `} />
                                <h2 className="flex justify-center items-center whitespace-nowrap truncate w-full">{project.name}</h2>
                            </div>
                            <div>
                                <h2>{project.subtitle}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}