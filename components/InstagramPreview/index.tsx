import { motion, useTransform, useScroll } from 'framer-motion'
import { RefObject, useRef, useState } from 'react';
import { SocialCard } from './SocialCard';
import { AnimatedText } from '../AnimatedText';
import { SectionHeader } from '../Section/SectionHeader';
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
    const translateScale = useTransform(scrollYProgress, [0.6, 0.7], ["-1000px", "560px"]);
    return (
        <div className='flex flex-col w-full justify-center gap-6'>
            <SectionHeader
                heading={`Let's connect.`}
                subheading='Socials'
                parentRef={scrollRef}
                postion='center'
            />
            <AnimatedText
                delay={400}
                align='center'
                scrollRef={scrollRef}>
                <span className='text-foreground-emphasized'>Thanks for taking a look.</span> If you like what you see, feel free to give a follow. Here are
                my main socials.
            </AnimatedText>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center relative gap-6">
                <div className='hidden lg:flex'></div>

                <motion.div className='absolute h-100 w-100 opacity-80 pointer-events-none'
                    style={{
                        backgroundImage: 'radial-gradient(var(--color-foreground-emphasized) 20%, transparent)',
                        filter: 'blur(300px)',
                        translateX: translateScale
                    }}
                >
                </motion.div>
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
