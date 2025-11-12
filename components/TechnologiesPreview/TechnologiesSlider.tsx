import { RefObject, useState, useEffect, useRef } from "react"
import { SliderItem } from "./types"
import { motion } from "framer-motion"

interface TechnologiesSliderProps {
    scrollRef: RefObject<HTMLDivElement | null>
    items: SliderItem[]
}

export const TechnologiesSlider = ({
    scrollRef,
    items
}: TechnologiesSliderProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoveredItem, setHoveredItem] = useState<SliderItem | null>(null)
    const [shownItems, setShownItems] = useState<SliderItem[]>([])
    const [showItems, setShowItems] = useState<boolean>(false)

    useEffect(() => {
        if (!showItems) return;

        const interval = setInterval(() => {
            setShownItems((prev) => {
                if (prev.length < items.length) {
                    return [...prev, items[prev.length]]
                }

                clearInterval(interval)
                return prev;
            })
        }, 250)

    }, [showItems])


    useEffect(() => {
        if (!scrollRef.current || !ref.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setShowItems(true)
                    }
                })
            }
        )

        observer.observe(ref.current)
    }, [scrollRef, ref])

    return (
        <div ref={containerRef} className="flex relative w-full">
            <motion.div className="flex flex-row gap-2 min-h-30"
                drag='x'
                dragConstraints={containerRef}>
                {shownItems && shownItems.map((item) => {
                    return (
                        <div key={item.name} className="flex flex-col fade-in gap-4 cursor-arrow hover:scale-105 justify-center items-center p-2 whitespace-nowrap  overflow-hidden min-h-30 min-w-30 bg-tech-items rounded-[25px]"
                            onMouseEnter={() => { setHoveredItem(item) }}
                            onMouseLeave={() => { setHoveredItem(null) }}>
                            <item.Icon size={36} color={`${hoveredItem === item ? 'oklch(0.698 0.1038 228.79)' : 'var(--color-foreground)'}`} />
                            <p className={`cursor-default ${hoveredItem === item ? "text-primary" : 'text-foreground'}`}>{item.name}</p>
                        </div>
                    )
                })}
                <div ref={ref} className="flex w-full" />
            </motion.div>
        </div>
    )
}