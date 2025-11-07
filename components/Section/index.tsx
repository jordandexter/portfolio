import { RefObject, useState, useEffect, ReactNode, useRef } from "react";

interface SectionProps {
    heading: string,
    subheading: string,
    parentRef: RefObject<HTMLDivElement | null>,
    variant?: 'dark' | 'darkest'
    children?: ReactNode
}

export function Section({
    heading,
    subheading,
    parentRef,
    variant,
    children
}: SectionProps) {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const background = !variant ? 'bg-background-section' : variant === 'dark' ? 'bg-section-background-dark' : 'bg-section-background-darkest'



    useEffect(() => {
        if (!parentRef.current || !triggerRef.current) return;

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
    }, [parentRef, triggerRef])

    return (
        <div className={`flex min-h-100 w-full justify-center items-center flex-col py-12 gap-6 relative ${background}`} >
            <div className="flex flex-col w-full max-w-[1500px] gap-10">
                <div ref={triggerRef} data-section={heading} className="absolute flex w-full top-[30%]" />
                <div className="overflow-y-visible">
                    {animationTrigger &&
                        <>
                            <h3 className="text-foreground fade-in">{subheading}</h3>
                            <h1 className="flex text-5xl bg-clip-text text-transparent inline-block fade-in"
                                style={{
                                    animationDuration: '1000ms',
                                    animationDelay: '200ms',
                                    backgroundImage: 'linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576dff)'
                                }}>
                                {heading}
                            </h1>
                        </>
                    }
                </div>
                {children}
            </div>
        </div >
    );
}
