import { useScreensize } from "@/app/hooks/useScreensize"
import { Project } from "./types"
import { RefObject, useState, useRef, useEffect } from "react"

interface ProjectContainerProps {
    project: Project,
    scrollRef: RefObject<HTMLDivElement | null>
    className?: string,
    objectPosition: string,
    variant: 'lg' | 'sm'
    onProjectModalOpen: (project: Project) => void
}

export const ProjectContainer = ({
    project,
    scrollRef,
    className,
    objectPosition,
    variant,
    onProjectModalOpen
}: ProjectContainerProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

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


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)

            if (window.innerWidth < 1100)
                setHovered(true)
            else {
                setHovered(false)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={`flex flex-col ${className} overflow-hidden ${variant === 'lg' ? 'md:max-w-[75%] w-full' : 'md:max-w-[25%] w-full relative'}`}
            onClick={() => onProjectModalOpen(project)}>
            <div className="flex h-50">
                {animationTrigger &&
                    <div className={`flex relative fade-in w-full cursor-pointer rounded-[10px] border-1 border-transparent hover:border-gray-600 overflow-hidden`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => {
                            if (windowWidth > 1100)
                                setHovered(false);
                            else
                                return;
                        }}
                        style={{
                            scrollbarWidth: 'none',
                        }}>
                        <>
                            <div className={`absolute flex flex-col z-1 justify-center items-end h-full w-full p-3`}>
                                <div className="flex flex-col items-center gap-2">
                                    {project.tools && project.tools.map((tool, index) => {
                                        return (
                                            <div key={tool.name} className={`flex flex-col justify-center transition-all ease-in-out items-center text-white ${hovered ? 'translate-x-0' : 'translate-x-50'}`}
                                                style={{
                                                    transitionDuration: `${((index + 1) * 300).toString()}ms`
                                                }}>
                                                <div className="flex rounded-full bg-white/30 p-2">
                                                    <tool.icon className="h-3 w-3" />
                                                </div>
                                                <h2 className="text-sm text-white">{tool.name}</h2>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={`absolute flex justify-start items-end h-full w-full p-6 ${hovered ? 'bg-black/40' : 'bg-black/0'}`}
                                style={{
                                }}>
                                <div className={`flex flex-col max-w-[75%] ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                                    <h1 className="text-white text-xl">{project.name}</h1>
                                    <h2 className="text-white text-sm">{project.description?.slice(0, variant === 'lg' ? 100 : 50)}...</h2>
                                </div>
                            </div>
                        </>

                        <img src={project.image} className={`object-cover transition-all duration-5000 ease-in-out ${hovered ? 'object-bottom' : objectPosition}`} height={2048} width={2732} />
                    </div>
                }
            </div>

            <div ref={triggerRef} className="flex w-full h-0 -translate-y-[25%]" />
        </div>
    )
}