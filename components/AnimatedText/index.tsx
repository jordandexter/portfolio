import { ReactNode, RefObject, useRef, useState, useEffect } from "react"

interface AnimatedTextProps {
    scrollRef: RefObject<HTMLDivElement | null>,
    delay: number,
    children: ReactNode
}

export function AnimatedText({
    scrollRef,
    delay,
    children
}: AnimatedTextProps) {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

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
        <>
            <h2 className="text-foreground max-w-[500px] text-xl font-bold transition-all duration-1000"
                style={{
                    translate: animationTrigger ? '0px 0px' : `0 20px`,
                    opacity: animationTrigger ? 100 : 0,
                    animationDelay: `${delay}ms`
                }}>
                {children}
            </h2>
            <div ref={triggerRef} className="flex w-full h-0" />
        </>
    )
}
