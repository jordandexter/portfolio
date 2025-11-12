import { RefObject, useState, useEffect, ReactNode, useRef } from "react";
import { SectionHeader } from "../Section/SectionHeader";
import { useScroll, useTransform, motion } from "framer-motion";

interface SectionProps {
    heading?: string,
    subheading?: string,
    parentRef: RefObject<HTMLDivElement | null>,
    variant?: 'dark' | 'darkest'
    children?: ReactNode

}

export function StickySection({
    heading,
    subheading,
    parentRef,
    variant,
    children
}: SectionProps) {
    const background = !variant ? 'bg-background-section' : variant === 'dark' ? 'bg-section-background-dark' : 'bg-section-background-darkest'
    const { scrollYProgress } = useScroll({
        target: parentRef,
        offset: ["start start", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0.35, 0.55, 0.76, 1], [0, 1, 1, 0]);
    const opacity = useTransform(scrollYProgress, [0.35, 0.55, 0.8, 1], [0, 1, 1, 0]);
    const rounded = useTransform(scrollYProgress, [0.35, 0.55, 0.763, 1], ["500px", "0px", "0px", "500px"]);

    return (
        <div className={`flex  h-[400vh] md:h-[280vh] min-h-100 w-full relative flex-col ${background}`} >
            <motion.div className="sticky top-0 h-screen flex flex-col w-full gap-6 overflow-hidden bg-black"
                style={{
                    scale: scale,
                    opacity: opacity,
                    borderRadius: rounded
                }}>
                <video src="/acid.mp4"
                    playsInline
                    autoPlay
                    controls={false}
                    muted
                    loop
                    className="h-full w-full object-cover opacity-80"
                />
            </motion.div>


            <div className="flex w-full items-center justify-center">
                <div className="flex w-full max-w-200 px-12 sm:justify-start justify-center">
                    <SectionHeader
                        heading={heading}
                        subheading={subheading}
                        parentRef={parentRef}
                    />
                </div>
            </div>
            {children}
        </div >
    );
}
