import { useScreensize } from "@/app/hooks/useScreensize"
import { StatisticContent } from "./StatisticContent"
import { Statistic } from "./types"
import { useTransform, useScroll, motion } from "framer-motion"
import { MapInputRange } from "framer-motion"

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
    const transformScale = useTransform(scrollYProgress, [0.24, 0.29], [500, 0]);
    const opacityScale = useTransform(scrollYProgress, [0.24, 0.29], [0, 1]);

    const transformScaleMobile = useTransform(scrollYProgress, [0.15, 0.30], [500, 0]);
    const opacityScaleMobile = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

    return (
        <div className="flex flex-col">

            {/* Mobile */}
            <div className="flex flex-row flex-wrap md:hidden gap-3 w-full">
                {stats.map((s, index) => {
                    const translateX = useTransform(
                        transformScaleMobile,
                        (v) => (index % 2 === 0 ? v : -v)
                    );

                    return (
                        <motion.div
                            key={s.title}
                            className="flex flex-1 p-0.5 md:w-fit rounded-[12px]"
                            style={{
                                translateX,
                                opacity: opacityScaleMobile,
                                backgroundImage:
                                    "linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576dff)",
                            }}>
                            <StatisticContent stat={s} animationTrigger={true} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Desktop */}
            <div className="hidden md:flex flex-row md:flex-nowrap gap-3 w-full">
                {stats.map((s, index) => {
                    const translateX = useTransform(
                        transformScale,
                        (v) => (index % 2 === 0 ? v : -v)
                    );
                    return (
                        <motion.div
                            key={s.title}
                            className="flex flex-1 p-0.5 md:w-fit rounded-[12px]"
                            style={{
                                translateX,
                                opacity: opacityScale,
                                backgroundImage:
                                    "linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576dff)",
                            }}>
                            <StatisticContent stat={s} animationTrigger={true} />
                        </motion.div>
                    );
                })}
            </div>
            <div ref={triggerRef} className="flex w-full" />
        </div>
    );
}