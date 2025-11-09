import { ReactNode, RefObject, useRef, useState, useEffect } from "react"

interface AnimatedParagraphProps {
    scrollRef: RefObject<HTMLDivElement | null>
    children: ReactNode
}

export const AnimatedParagraph = ({
    scrollRef,
    children
}: AnimatedParagraphProps) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const [animationTrigger, setAnimationTrigger] = useState<boolean>(false);

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
        <div>
            <div className={`${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all py-4 relative`}
                style={{
                    transitionDuration: '1000ms'
                }}>
                {children}
            </div>
            <div ref={triggerRef} className="flex w-full" />
        </div>
    )
}