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
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 0.269, 0.7, 1.2], [0, 1, 1, 0]);

    return (
        <div ref={ref} className={`flex w-full h-[270vh] relative flex-col ${background}`} >
            <motion.div className="sticky flex top-0 h-screen flex-col w-full gap-6 overflow-hidden bg-black"
                style={{
                    scale: scale,
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
