import { RefObject, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useDragControls } from "framer-motion";
import { designs } from "./constants";
import { Pause, Play } from "lucide-react";

interface GraphicDesignPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

const FOCUS_DURATION = 4000 // In Milliseconds

export function GraphicDesignPreview({ scrollRef }: GraphicDesignPreviewProps) {
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const triggerTextRef = useRef<HTMLDivElement>(null)

    const focusedImageIndex = useRef(0)
    const triggerRef = useRef(false)
    const [focusDurationElapsed, setFocusDurationElapsed] = useState(0)
    const [offset, setOffset] = useState(0);
    const controls = useDragControls()
    const [isPlaying, setIsPlaying] = useState(false)

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });
    const opacityScale = useTransform(scrollYProgress, [0.33, 0.395], ["0%", "100%"]);
    const translateScale = useTransform(scrollYProgress, [0.33, 0.395], ["200px", "0px"]);

    const opacityScaleMobile = useTransform(scrollYProgress, [0.3, 0.38], ["0%", "100%"]);
    const translateScaleMobile = useTransform(scrollYProgress, [0.35, 0.38], ["200px", "0px"]);



    const getCarouselContainer = () => {
        const carouselContainer = document.getElementById('carousel');
        const carouselContainerMobile = document.getElementById('carousel-mobile');

        if (carouselContainer)
            return carouselContainer;
        if (carouselContainerMobile)
            return carouselContainerMobile;

        return null
    }

    const handleFocusLeft = (spacesToMove: number) => {
        if (focusedImageIndex.current - spacesToMove < 0) {
            handleFocusRight(designs.length - 1)
            return;
        }
        setOffset((prev) => {
            const carouselContainer = getCarouselContainer()
            let newOffset = 0;
            if (carouselContainer) {
                const containerWidth = carouselContainer.scrollWidth;
                newOffset = prev + ((containerWidth / designs.length) * spacesToMove)
                carouselContainer.style.translate = `${newOffset}px`
                return newOffset
            }
            return prev;
        })
        focusedImageIndex.current = focusedImageIndex.current - spacesToMove
    }

    const handleFocusRight = (spacesToMove: number) => {
        if (focusedImageIndex.current + spacesToMove > designs.length - 1) {
            if (isPlaying) {
                setIsPlaying(false)
                return;
            }
            handleFocusLeft(designs.length - 1)
            return;
        }

        setOffset((prev) => {
            const carouselContainer = getCarouselContainer();
            let newOffset = 0;
            if (carouselContainer) {
                const containerWidth = carouselContainer.scrollWidth;
                newOffset = prev + ((containerWidth / designs.length) * spacesToMove) * -1
                carouselContainer.style.translate = `${newOffset}px`
                return newOffset
            }
            return prev;
        })
        focusedImageIndex.current = focusedImageIndex.current + spacesToMove
    }

    useEffect(() => {
        let intervalObject: NodeJS.Timeout;
        const interval = 10;

        if (isPlaying) {
            if (focusedImageIndex.current == designs.length - 1) {
                const carouselContainer = getCarouselContainer()

                if (carouselContainer) {
                    carouselContainer.style.translate = '0px';
                    setOffset(0)
                    focusedImageIndex.current = 0;
                }
            }

            triggerRef.current = false;
            intervalObject = setInterval(() => {
                setFocusDurationElapsed((prev) => {
                    const next = prev + interval

                    if (next >= FOCUS_DURATION && !triggerRef.current) {
                        triggerRef.current = true;
                        handleFocusRight(1)
                        return 0;
                    }

                    if (next < FOCUS_DURATION) triggerRef.current = false;
                    return next >= FOCUS_DURATION ? 0 : next;
                })
            }, interval)
        } else {
            setFocusDurationElapsed(0)
        }

        return () => {
            if (intervalObject) clearInterval(intervalObject)
        }

    }, [isPlaying])


    useEffect(() => {
        const handleResize = () => {
            const carouselContainer = getCarouselContainer()
            if (carouselContainer) {
                setIsPlaying(false)
                focusedImageIndex.current = 0;
                setOffset(0)
                carouselContainer.style.translate = '0px'
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    useEffect(() => {
        if (!scrollRef.current || !triggerTextRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(triggerTextRef.current)
    }, [triggerTextRef, scrollRef])

    return (
        <>
            <div ref={triggerTextRef} className="flex w-full justify-center">
                {animationTrigger &&
                    <h1 className=" flex flex-col w-[100%] justify-center text-center text-xl max-w-[500px] fade-in"
                        style={{
                            animationDelay: '600ms',
                            display: 'inline'
                        }}>
                        <span className="text-foreground-emphasized inline">
                            Beautiful websites 25+ years in the making.
                        </span>{" "}
                        Elegant, visually appealing designs have been a lifelong hobby.
                    </h1>
                }
            </div>

            {/* Mobile */}
            <motion.div className="flex md:hidden w-full flex-col justify-center items-center"
                style={{
                    opacity: opacityScaleMobile,
                    translateY: translateScaleMobile
                }}>
                <div className="flex w-full justify-center">
                    <div className="flex w-150 md:w-150 lg:h-200 lg:w-200 relative">
                        <motion.div
                            id='carousel-mobile'
                            className=" flex min-h-full flex-row flex-nowrap transition-all duration-1000 ease-in-out"
                            drag='x'
                            dragControls={controls}
                            onPointerDown={(e) => controls.start(e)}
                            style={{
                                x: 'x'
                            }}>
                            {designs.map((imagePath, index) => {
                                return (
                                    <div key={`${imagePath}-${index}`} className={`flex select-none justify-center items-center overflow-hidden ${isPlaying ? '' : 'cursor-pointer'} min-w-[100%] h-full transition-all duration-1000 p-4 ${index === focusedImageIndex.current ? '' : 'scale-90'}`} onClick={() => {
                                        if (isPlaying) return;

                                        if (index < focusedImageIndex.current) {
                                            handleFocusLeft(focusedImageIndex.current - index)
                                        } else {
                                            handleFocusRight(index - focusedImageIndex.current)
                                        }
                                    }}>
                                        <div className="flex max-w-[100%] max-h-[100%] rounded-[25px] overflow-hidden"
                                            style={{
                                                boxShadow: '0 10px 10px 0 rgba(0,0,0,0.05)'
                                            }} >
                                            <img key={imagePath} className="object-cover " src={`/designs/${imagePath}`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </motion.div >


            {/* Desktop */}
            <motion.div className="hidden md:flex w-full flex-col justify-center items-center"
                style={{
                    opacity: opacityScale,
                    translateY: translateScale
                }}>
                <div className="flex w-full justify-center">
                    <div className="flex w-150 md:w-150 lg:h-200 lg:w-200 relative">
                        <motion.div
                            id='carousel'
                            className=" flex min-h-full flex-row flex-nowrap transition-all duration-1000 ease-in-out"
                            drag='x'
                            dragControls={controls}
                            onPointerDown={(e) => controls.start(e)}
                        >
                            {designs.map((imagePath, index) => {
                                return (
                                    <div key={`${imagePath}-${index}`} className={`flex select-none justify-center items-center overflow-hidden ${isPlaying ? '' : 'cursor-pointer'} min-w-[100%] h-full transition-all duration-1000 p-4 ${index === focusedImageIndex.current ? '' : 'scale-90'}`} onClick={() => {
                                        if (isPlaying) return;

                                        if (index < focusedImageIndex.current) {
                                            handleFocusLeft(focusedImageIndex.current - index)
                                        } else {
                                            handleFocusRight(index - focusedImageIndex.current)
                                        }
                                    }}>
                                        <div className="flex max-w-[100%] max-h-[100%] rounded-[25px] overflow-hidden"
                                            style={{
                                                boxShadow: '0 10px 10px 0 rgba(0,0,0,0.05)'
                                            }} >
                                            <img key={imagePath} className="object-cover " src={`/designs/${imagePath}`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </motion.div >


            <div className="flex flex-col gap-2 justify-center items-center w-full">
                <div className="flex flex-row gap-2">
                    <div className="flex bg-foreground/50 p-2 rounded-full gap-1">
                        {designs.map((item, index) => {
                            return (
                                <div key={item} className={`flex min-h-2 z-10 rounded-full transition-all duration-1000 cursor-pointer ${focusedImageIndex.current === index ? 'w-10 bg-white' : 'w-2 bg-gray-500'}`}
                                    onClick={() => {
                                        if (index < focusedImageIndex.current) {
                                            handleFocusLeft(focusedImageIndex.current - index)
                                        } else {
                                            handleFocusRight(index - focusedImageIndex.current)
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className="flex bg-foreground/50 rounded-full " onClick={() => { setIsPlaying(!isPlaying) }}>
                        <div className={`flex justify-center items-center z-10 rounded-full cursor-pointer`}
                        >
                            {!isPlaying ? (
                                <Play fill="white" strokeWidth={0} className="h-3" />
                            ) : (
                                <Pause fill="white" strokeWidth={0} className="h-3" />
                            )}
                        </div>
                    </div>
                </div>
                <div className={`flex justify-start w-32 h-1 ${isPlaying ? 'bg-foreground/50' : ''} rounded-full overflow-hiddenx`}>
                    <div className="flex h-1 bg-white"
                        style={{
                            width: `${Math.round((focusDurationElapsed / FOCUS_DURATION) * 100)}%`
                        }}
                    />

                </div>
            </div>
        </>
    );
}
