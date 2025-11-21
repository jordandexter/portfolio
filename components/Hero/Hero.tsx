"use client"
import { useRef, RefObject, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HeroMobileHeader from "./HeroMobile";

const SHOW_CONTAINER_NAMES = false

interface HeroHeaderProps {
    scrollRef: RefObject<HTMLDivElement | null>;
    aboutSectionRef: RefObject<HTMLDivElement | null>;
    onOpenContactModal: () => void;
}

export default function HeroHeader({
    scrollRef,
    aboutSectionRef,
    onOpenContactModal
}: HeroHeaderProps) {
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    const opacityScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);
    const scaleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.0]);
    const blurScale = useTransform(scrollYProgress, [0, 1], ["0px", "200px"])

    const scrollToAbout = () => {
        const body = document.getElementsByTagName('html')[0]
        if (aboutSectionRef.current) {
            const top = aboutSectionRef.current.getBoundingClientRect().top + window.pageYOffset;
            if (body && aboutSectionRef.current) {
                body.scrollTo({
                    top: top - 100,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <>
            <motion.div className="hidden md:flex sticky top-0 z-0 gap-10 flex-col md:flex-row md:h-screen h-[calc(100vh-155px)] w-full pt-15" style={{
                opacity: opacityScale,
                scale: scaleScale,
                filter: blurScale && useTransform(blurScale, (b) => `blur(${b})`)
            }}>
                {SHOW_CONTAINER_NAMES && <p className="absolute text-red-500 font-bold">container 1</p>}
                <div className="flex items-center justify-center flex-col flex-1 rounded-xl min-h-100 gap-8">
                    <div className="flex  h-50 w-50 md:h-50 md:w-50 fade-in rounded-full overflow-hidden justify-center items-center bg-white"
                        style={{
                            animationDuration: '1000ms',
                        }}>
                        <img className="object-cover h-50 w-50"
                            src="/IMG_4202.jpg"
                        />
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <h2 className="fade-in text-xl" style={{
                            animationDuration: '1000ms',
                            animationDelay: '200ms'
                        }}>
                            Frontend Developer | Software Engineer
                        </h2>
                        <h1 className="text-5xl fade-in bg-clip-text text-transparent"
                            style={{
                                animationDuration: '1000ms',
                                animationDelay: '400ms',
                                backgroundImage: 'linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576dff)'
                            }}>
                            Jordan Dexter
                        </h1>
                        <div className="grid z-10 grid-cols-2 pt-4 gap-4 fade-in"
                            style={{
                                animationDuration: '1000ms',
                                animationDelay: '600ms',
                            }}>
                            <button className="flex bg-gray-500 transition-all duration-300 min-w-[150px] rounded-full text-gray-200 font-bold hover:bg-gray-600 hover:text-white"
                                onClick={() => { scrollToAbout() }}>
                                About
                            </button>
                            <button className="flex bg-primary transition-all duration-300 min-w-[150px] rounded-full text-gray-200 py-2 font-bold hover:bg-primary-hover hover:text-white"
                                onClick={onOpenContactModal}>
                                Contact
                            </button>
                        </div>
                    </div>
                </div>


                <motion.div
                    className="absolute w-screen max-w-[800px] h-[800px] bottom-[-550px] right-1/2 translate-x-1/2 rounded-full opacity-40 animate-pulse fade-in-ball"
                    style={{
                        background: 'radial-gradient(circle, var(--hero-glow), #ffffff00)',
                        filter: 'blur(30px)',
                        animationDelay: '1000ms'
                    }}
                />
            </motion.div>

            <HeroMobileHeader
                scrollRef={scrollRef}
                aboutSectionRef={aboutSectionRef}
                onOpenContactModal={onOpenContactModal} />
        </>
    )
}