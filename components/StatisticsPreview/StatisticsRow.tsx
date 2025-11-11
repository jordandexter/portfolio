import { StatisticContent } from "./StatisticContent"
import { Statistic } from "./types"
import { useTransform, useScroll } from "framer-motion"
import { useState, useEffect, RefObject, useRef } from "react"

interface StatisticRowProps {
    stats: Statistic[]
    scrollRef: RefObject<HTMLDivElement | null>
}

export const StatisticsRow = ({
    stats,
    scrollRef
}: StatisticRowProps) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });
    const transformScale = useTransform(scrollYProgress, [0.37, 0.42], [0, 500]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 w-full">
                {stats.map((s, index) => {
                    return (
                        <div key={s.title} className="flex flex-1 p-0.5 md:w-fit rounded-[12px] transition-all duration-2000"
                            style={{
                                transform: `${index % 2 === 0 ? `${-1 * transformScale.get()}px` : `${transformScale}px`}`,
                                backgroundImage: 'linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576dff)',
                            }}>
                            <StatisticContent
                                stat={s}
                                animationTrigger={true}
                            />
                        </div>
                    )
                })}

            </div>
            <div ref={triggerRef} className="flex w-full" />
        </div>
    )
}