import { motion, useTransform, useScroll } from 'framer-motion'
import { RefObject, useRef, useState } from 'react';
import { SocialCard } from './SocialCard';
import { AnimatedText } from '../AnimatedText';

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
            <AnimatedText
                delay={400}
                align='left'
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
                <div className='flex flex-col gap-3'>
                    <SocialCard
                        username='de.xterart'
                        displayName='Dexter'
                        link='https://www.instagram.com/de.xterart/'
                        image='instagram_logo.png'
                        hoverImage='instagram-hover.png'
                        setImage={setImage} />

                    <SocialCard
                        username='jordandexter'
                        displayName='Jordan Dexter'
                        link='https://github.com/jordandexter'
                        image='github_logo.png'
                        hoverImage='github-hover.png'
                        setImage={setImage}
                        invert={true} />

                    <SocialCard
                        username='jordan-dexter1'
                        displayName='Jordan Dexter'
                        link='https://www.linkedin.com/in/jordan-dexter1'
                        image='linkedin_logo.png'
                        setImage={setImage}
                        hoverImage='linkedin-hover.png' />
                </div>
            </div>
        </div >
    );
}
