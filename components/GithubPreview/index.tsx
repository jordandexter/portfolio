import { RefObject, useEffect, useState, useRef, MouseEvent } from "react";
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
    const [flareX, setFlareX] = useState<number>(80)
    const [leftFlareOpacity, setLeftFlareOpacity] = useState(0)
    const [rightFlareOpacity, setRightFlareOpacity] = useState(0)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left
        if (x < 80) {
            setFlareX(80)
            return;
        }
        if (x > 200) {
            setFlareX(200)
            return;
        }
        setFlareX(x)
    }


    useEffect(() => {
        setLeftFlareOpacity((200 - flareX) / 200)
        setRightFlareOpacity((flareX) / 200)

    }, [flareX])

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

            <div className="flex relative justify-center">
                <img className="md:rounded-[25px] z-1 border-2 min-w-[100vw] md:min-w-full border-primary" src={'/github-profile.png'} />
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
                <div className="flex w-full max-w-70 relative"
                    onMouseMove={(e) => handleMouseMove(e)}>
                    <div className="absolute z-3 flex h-9 w-10 rounded-full opacity-60 pointer-events-none"
                        style={{
                            left: `${flareX - 22}px`,
                            backgroundImage: 'radial-gradient(#00000000, oklch(0.69 0.1038 228.79))',
                            filter: 'blur(4px)',
                            top: 4,
                            transform: 'scaleX(4) scaleY(1.3)'
                        }}>
                    </div>
                    <div className="absolute flex z-0 h-12 w-13"
                        style={{
                            backgroundImage: 'radial-gradient(white 10%, blue, oklch(0.69 0.1038 228.79), #00000000)',
                            opacity: leftFlareOpacity,
                            filter: 'blur(8px)',
                            top: -4,
                            left: -5
                        }}>
                    </div>
                    <div className="absolute flex z-0 h-12 w-13"
                        style={{
                            backgroundImage: 'radial-gradient(white 10%, blue, oklch(0.69 0.1038 228.79), #00000000)',
                            opacity: rightFlareOpacity,
                            filter: 'blur(8px)',
                            top: -4,
                            right: -5
                        }}>
                    </div>
                    <a className="flex z-2 justify-center rounded-full bg-white text-primary border-primary border-2 font-bold py-2 w-full"
                        href={'https://github.com/jordandexter/portfolio'}
                        target="__blank">
                        <p className="z-2">Go to Repo</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
