import { ArrowRight } from "lucide-react"
import { projects } from "./constants"
import { useState, RefObject, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Project } from "./types"

interface ProjectPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
    onProjectModalOpen: (project: Project) => void
}

export function ProjectPreview({
    scrollRef,
    onProjectModalOpen
}: ProjectPreviewProps) {
    const [hoveredItem, setHoveredItem] = useState<Project | null>(null)
    const [shownProject, setShownProjects] = useState<Project[]>([])
    const [showImage, setShowImage] = useState<boolean>(false);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });
    const opacityScale = useTransform(scrollYProgress, [0.0, 0.07], [0, 1]);
    const opacityScaleItems = useTransform(scrollYProgress, [0.0, 0.07], [0.0, 1]);

    const [animationTrigger, setAnimationTrigger] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null)

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
    }, [triggerRef, scrollRef])

    const animateProjects = async () => {
        for (let i = 0; i < projects.length; i++) {
            setShownProjects((prev) => [...prev, projects[i]])
            setHoveredItem(projects[i]);
            await new Promise((resolve) => setTimeout(resolve, 150));
            setHoveredItem(null);
        }

        setTimeout(() => {
            setShowImage(true)
            setHoveredItem(null)

        }, 1000)

    };

    useEffect(() => {
        if (animationTrigger) {
            animateProjects();
        }
    }, [animationTrigger]);

    return (
        <motion.div className="flex flex-col w-full">
            <div className="flex md:flex-row flex-col gap-6">
                <motion.div className={`flex min-h-80 md:min-h-[250px] md:min-h-[400px] md:w-[50%] md:max-h-[468px] bg-background fade-in overflow-hidden rounded-[25px] justify-center relative`}
                    style={{
                        scale: opacityScale,
                        opacity: showImage ? opacityScale : 0
                    }}>
                    {showImage && shownProject.map((project) => {
                        return (
                            <img className={`${hoveredItem === project ? 'z-1 opacity-100' : 'z-0 opacity-0'} object-cover transition-all duration-300 absolute h-full w-full`} src={project.image}></img>
                        )
                    })}
                </motion.div>

                <motion.div className="flex flex-col md:w-[50%] border-foreground min-h-100"
                    style={{
                        opacity: opacityScaleItems
                    }}>
                    {shownProject.map((project) => {
                        return (
                            <div key={project.name} className={`flex flex-row py-5 justify-between fade-in transition-all duration-300 ${hoveredItem === project ? 'text-primary font-bold' : ''} cursor-pointer hover:border-primary border-foreground w-full border-b-1`}
                                onMouseEnter={() => { setHoveredItem(project) }}
                                onMouseLeave={() => { setHoveredItem(null) }}
                                onClick={() => {
                                    setHoveredItem(project)
                                    onProjectModalOpen(project)
                                }}>
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
                </motion.div>
            </div>
            <div ref={triggerRef} className="flex w-full" />
        </motion.div >
    )
}