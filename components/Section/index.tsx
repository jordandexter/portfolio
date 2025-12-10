"use client"
import { RefObject, ReactNode, useState, useRef, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";
import { AnimatedText } from "../AnimatedText";

interface SectionProps {
    heading?: string,
    subheading?: string,
    paragraphEmphasized?: string,
    paragraphText?: string,
    position?: 'center' | 'left' | 'right',
    parentRef: RefObject<HTMLDivElement | null>,
    variant?: 'dark' | 'darkest'
    children?: ReactNode

}

export function Section({
    heading,
    subheading,
    paragraphEmphasized,
    paragraphText,
    position = 'left',
    parentRef,
    variant,
    children
}: SectionProps) {
    const background = !variant ? 'bg-background-section' : variant === 'dark' ? 'bg-section-background-dark' : 'bg-section-background-darkest'
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    useEffect(() => {
        if (!parentRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setAnimationTrigger(true)
                        }, 800)


                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [parentRef, triggerRef])


    return (
        <div className={`flex px-10 min-h-100 w-[100vw] overflow-hidden justify-center items-center flex-col py-12 relative ${background}`} >
            <div className="flex flex-col w-full max-w-[1000px] gap-6">
                <SectionHeader
                    heading={heading}
                    postion={position}
                    subheading={subheading}
                    parentRef={parentRef}
                />

                <AnimatedText
                    scrollRef={parentRef}
                    align={position}
                    delay={400}
                >
                    <span className="text-foreground-emphasized">{paragraphEmphasized}</span> {paragraphText}
                </AnimatedText>

                <div className={`transition-opacity transition-translate duration-1000 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div ref={triggerRef} className="flex w-full h-0" />
                    {children}
                </div>
            </div>
        </div >
    );
}
