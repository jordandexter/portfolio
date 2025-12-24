"use client"
import { RefObject, ReactNode, useState, useRef, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";
import { AnimatedText } from "../AnimatedText";
import { useFocusedSection } from "@/stores/focusedSection";


/*

Section Component:

In order for each section to behave as similarly as possible, the section compoent defines the general layout
of each portion of the page: heading, paragraph, and  children.

There are a few configurable values such as alignment or background color. However, the sections are not suppose
to be infinately flexible to keep the design of the application as cohesive as possible.

*/

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
    const [showAnimatedText, setShowAnimatedText] = useState(false);
    const [showChildren, setShowChildren] = useState(!heading && !subheading ? true : false);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const { setFocusedSection } = useFocusedSection()

    useEffect(() => {
        if (!parentRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        if (heading) {
                            setFocusedSection(heading)
                        }
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [parentRef, triggerRef])

    return (
        <div id={heading} className={`flex px-10 min-h-100 overflow-hidden justify-center items-center flex-col py-12 relative ${background}`} >
            <div className="flex flex-col w-full max-w-[1000px] gap-6">

                <SectionHeader
                    heading={heading}
                    postion={position}
                    subheading={subheading}
                    parentRef={parentRef}
                    onAnimationEnd={() => { setShowAnimatedText(true) }}
                />

                <AnimatedText
                    showAnimatedText={showAnimatedText}
                    scrollRef={parentRef}
                    align={position}
                    onAnimationEnd={() => { setShowChildren(true) }}
                >
                    {(paragraphEmphasized || paragraphText) &&
                        <>
                            <span className="text-foreground-emphasized">{paragraphEmphasized}</span> {paragraphText}
                        </>
                    }
                </AnimatedText>

                <div className={`transition-opacity transition-translate duration-1000 ${animationTrigger && showChildren ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div ref={triggerRef} className="flex w-full h-0 translate-y-100 pointer-events-none" />
                    {children}
                </div>
            </div>
        </div >
    );
}
