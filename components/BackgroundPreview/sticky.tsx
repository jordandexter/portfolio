import { motion, useTransform, useScroll } from 'framer-motion'
import { RefObject, useRef } from 'react';

interface BackgroundStickyProps {
    scrollRef: RefObject<HTMLDivElement | null>
}


export const BackgroundSticky = ({
    scrollRef
}: BackgroundStickyProps) => {
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 0.269, 0.7, 1.2], [0, 1, 1, 0]);
    const rounded = useTransform(scrollYProgress, [0, 0.269, 0.7, 1.2], ["500px", "0px", "0px", "500px"]);

    return (
        <motion.div className="flex top-0 min-h-[100vh] flex-col w-full gap-6 overflow-hidden"
            style={{
                scale: scale,
                borderRadius: rounded
            }}>
            <video src="/acid.mp4"
                playsInline
                autoPlay
                controls={false}
                muted
                loop
                className="flex h-full w-full object-cover min-h-full opacity-80"
            />
        </motion.div>
    );
}