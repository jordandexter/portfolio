"use client"
import { RefObject, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useModalStore } from "@/stores/modalStore";
import { useFocusedSection } from "@/stores/focusedSection";

const SHOW_CONTAINER_NAMES = false

interface HeroHeaderProps {
    scrollRef: RefObject<HTMLDivElement | null>;
    aboutSectionRef: RefObject<HTMLDivElement | null>;
}

export default function HeroHeader({
    scrollRef,
    aboutSectionRef,
}: HeroHeaderProps) {
    const { setContactFormModalOpen } = useModalStore()
    const { setFocusedSection } = useFocusedSection()
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    const opacityScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const scaleScale = useTransform(scrollYProgress, [0, 1], [1, 0.0]);
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


    useEffect(() => {
        if (!scrollRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setFocusedSection("Home")
                    }
                })
            }
        )
        observer.observe(triggerRef.current)
    }, [scrollRef, triggerRef])

    return (
        <>

            <div id="Home" ref={triggerRef} className="flex w-full h-0 top-15 absolute" />
            <motion.div className="flex sticky top-0 z-0 gap-10 flex-col md:flex-row md:h-screen h-[calc(100vh-155px)] w-full pt-15" style={{
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
                        <h1 className="text-5xl fade-in bg-clip-text text-transparent primary-gradient"
                            style={{
                                animationDuration: '1000ms',
                                animationDelay: '400ms',
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
                                onClick={() => setContactFormModalOpen(true)}>
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div >
        </>
    )
}