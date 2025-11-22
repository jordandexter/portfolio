import { ReactNode, RefObject, useRef, useState, useEffect } from "react"

interface AnimatedTextProps {
    scrollRef: RefObject<HTMLDivElement | null>,
    align?: 'left' | 'center' | 'right',
    delay: number,
    children: ReactNode
}

export function AnimatedText({
    scrollRef,
    align = 'left',
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
        <div className={`flex flex-col w-full white ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'}`}>
            <h2 className="text-foreground max-w-[500px] text-xl font-bold transition-all duration-1000"
                style={{
                    translate: animationTrigger ? '0px 0px' : `0 20px`,
                    opacity: animationTrigger ? 100 : 0,
                    animationDelay: `${delay}ms`
                }}>
                {children}
            </h2>
            <div ref={triggerRef} className="flex w-full h-0" />
        </div>
    )
}
