"use client"
import { motion, useTransform, useScroll } from 'framer-motion'
import { RefObject, useRef, useState } from 'react';
import { SocialCardContainer } from './SocialCardContainer';

interface InstagramPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function InstagramPreview({
    scrollRef
}: InstagramPreviewProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [image, setImage] = useState<string>('instagram-hover.png')
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });
    const translateScale = useTransform(scrollYProgress, [0.6, 0.7], ["-1000px", "650px"]);
    return (
        <div className='flex flex-col w-full justify-center gap-6 md:pb-10'>

            <motion.div className='absolute h-80 w-80 opacity-80 pointer-events-none'
                style={{
                    backgroundImage: 'radial-gradient(var(--color-foreground-emphasized) 20%, transparent)',
                    filter: 'blur(200px)',
                    translateX: translateScale
                }}
            >
            </motion.div>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center relative gap-6">
                <div className='hidden lg:flex'></div>

                <div className='flex w-full justify-center'>
                    <img src={image} className="h-150 min-w-70 max-w-70 z-1 border-8 border-black w-full overflow-hidden rounded-[36px] object-cover" height={2532} width={1170} />
                </div>
                <SocialCardContainer
                    scrollRef={scrollRef}
                    setImage={setImage}
                />

            </div>
        </div >
    );
}
