import { s } from "framer-motion/client"
import { Statistic } from "./types"
import { useState, useEffect } from "react"

interface StatisticContentProps {
    stat: Statistic
    animationTrigger: boolean
}

export const StatisticContent = ({
    stat,
    animationTrigger
}: StatisticContentProps) => {
    const [value, setValue] = useState<number>(0);






    useEffect(() => {
        if (!animationTrigger) return;

        const interval = setInterval(() => {
            setValue((prev) => {
                if (prev + 1 > stat.value) {
                    clearInterval(interval)
                    return stat.value;
                }
                return Math.floor(prev + Math.max((stat.value / 30), 1))
            })
        }, Math.max((stat.value / 30), 1) === 1 ? 300 : 100)

        return () => {
            clearInterval(interval)
        }
    }, [animationTrigger])


    return (
        <div className="flex w-full justify-between flex-col bg-section-background p-6 rounded-[10px]">
            <h1 className="inline-block text-3xl">{stat.title}</h1>
            <h1 className="flex items-center text-transparent inline-block bg-clip-text text-3xl"
                style={{
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(45deg, #59B5BD, #42a1e0ff, #0f576dff)',
                    WebkitBackgroundClip: 'text'
                }}><span className="-translate-y-1">{value} {stat.metric}</span></h1>
        </div>
    )
}