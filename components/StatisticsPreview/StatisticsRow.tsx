import { useScreensize } from "@/app/hooks/useScreensize"
import { StatisticContent } from "./StatisticContent"
import { Statistic } from "./types"
import { useTransform, useScroll, motion } from "framer-motion"
import { MapInputRange } from "framer-motion"

import { useState, useEffect, RefObject, useRef } from "react"

interface StatisticRowProps {
    stats: Statistic[]
}

export const StatisticsRow = ({
    stats,
}: StatisticRowProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });
    const transformScale = useTransform(scrollYProgress, [0, 0.4], [500, 0]);
    const opacityScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <div ref={ref} className="flex flex-col">
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 w-full">
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
        </div>
    );
}