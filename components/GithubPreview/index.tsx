import { RefObject, useEffect, useState, useRef } from "react";
import { SectionHeader } from "../Section/SectionHeader";
import { useScroll } from "framer-motion";

interface GithubPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function GithubPreview({
    scrollRef
}: GithubPreviewProps) {

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        if (!scrollRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [scrollRef, triggerRef])

    return (
        <div className="flex gap-6 flex-col relative">
            <SectionHeader
                heading="View on Github"
                subheading="Github"
                postion="left"
                parentRef={scrollRef}
            />

            <div className="flex w-full justify-start">
                {animationTrigger &&
                    <h1 className="text-foreground max-w-[500px] fade-in text-xl text-left font-bold fade-in"
                        style={{
                            animationDelay: '500ms'
                        }}><span className="text-foreground-emphasized">Want to know more?</span> I'd love it if
                        you took a look at this project on Github, or explore a few of my other projects.
                    </h1>
                }

                <div ref={triggerRef} className="flex w-full h-0" />
            </div>

            <div className="flex relative">
                <img className="rounded-[25px] z-1 border-2 border-primary" src={'/github-profile.png'} />
                <div className="absolute h-full w-full">
                    <div className="flex h-full w-full justify-center items-center relative">
                        <div id='accent' className="abosolute flex h-full w-full transition-all animate-rotate-top"
                            style={{
                                backgroundImage: 'radial-gradient(oklch(0.60 0.1038 228.79), #00000000)',
                                filter: 'blur(25px)'
                            }} />
                        <div id='accent' className="absolute flex h-full w-full transition-all animate-rotate-bottom"
                            style={{
                                backgroundImage: 'radial-gradient(white, #00000000)',
                                filter: 'blur(25px)'
                            }} />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center items-center relative">
                <a className="flex justify-center rounded-full bg-primary hover:bg-primary-hover max-w-70 text-white font-bold py-2 w-full overflow-hidden relative"
                    href={'https://github.com/jordandexter/portfolio'}
                >
                    <p className="z-2">Go to Repo</p>
                </a>
            </div>
        </div>
    );
}
