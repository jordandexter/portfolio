import { IconType } from "react-icons";
import { tools } from "./constants";
import { useEffect, useState, useRef, RefObject } from "react";

interface TechnologiesPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>;
}

export function TechnologiesPreview({
    scrollRef
}: TechnologiesPreviewProps
) {
    const ref = useRef<HTMLDivElement>(null)
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [shownTools, setShownTools] = useState<{ name: string, Icon: IconType }[]>([])
    const [showTools, setShowTools] = useState<boolean>(false)


    useEffect(() => {
        if (!showTools) return;

        const interval = setInterval(() => {
            setShownTools((prev) => {
                if (prev.length < tools.length) {
                    return [...prev, tools[prev.length]]
                }

                clearInterval(interval)
                return prev;
            })
        }, 250)

    }, [showTools])


    useEffect(() => {
        if (!scrollRef.current || !ref.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setShowTools(true)
                    }
                })
            }
        )

        observer.observe(ref.current)
    }, [scrollRef, ref])

    return (
        <div className="flex w-full flex-col gap-5 scrollbar-hide min-h-64"
            style={{
                scrollbarWidth: 'none'
            }}>

            <h2 className="text-foreground max-w-[500px] fade-in"
                style={{
                    animationDelay: '400ms'
                }}>
                Frontend focused engineer comfortable with a variety of backend technologies.
            </h2>
            <div className="flex flex-row gap-2 w-full">
                {showTools && shownTools.map((tool) => {
                    return (
                        <div key={tool.name} className="flex flex-col fade-in gap-4 cursor-arrow hover:scale-105 transition-all duration-300 justify-center items-center p-2 whitespace-nowrap  overflow-hidden min-h-30 min-w-30 bg-tech-items rounded-[25px]"
                            onMouseEnter={() => { setHoveredIcon(tool.name) }}
                            onMouseLeave={() => { setHoveredIcon(null) }}>
                            <tool.Icon size={36} color={`${hoveredIcon === tool.name ? 'oklch(0.698 0.1038 228.79)' : 'var(--color-foreground)'}`} />
                            <p className={`cursor-default ${hoveredIcon === tool.name ? "text-primary" : 'text-foreground'}`}>{tool.name}</p>
                        </div>
                    )
                })}



            </div>
            <div ref={ref} className="flex w-full" />
        </div>
    );
}
