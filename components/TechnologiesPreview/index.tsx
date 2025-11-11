import { tools } from "./constants";
import { RefObject, useState, useRef, useEffect } from "react";
import { TechnologiesSlider } from "./TechnologiesSlider";

interface TechnologiesPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>;
}

export function TechnologiesPreview({
    scrollRef
}: TechnologiesPreviewProps
) {
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null)

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
    }, [triggerRef, scrollRef])

    return (
        <div className="flex w-full flex-col gap-5 scrollbar-hide"
            style={{
                scrollbarWidth: 'none'
            }}>

            {animationTrigger &&

                <h2 className="text-foreground max-w-[500px] fade-in text-xl font-bold"
                    style={{
                        animationDelay: '600ms'
                    }}>
                    <span className="text-foreground-emphasized">Frontend focused. Backend trained.</span> With my formal training in network infrastructre and DevOps, I not only
                    implement your application, but gaurentee performance and longevity.
                </h2>
            }

            <div ref={triggerRef} className="flex w-full" />

            <h1 className="text-primary">Frontend</h1>
            <div className="flex flex-row gap-2 w-full">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'frontend')} />
            </div>


            <h1 className="text-primary">Backend</h1>
            <div className="flex flex-row gap-2 w-full">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'backend')} />
            </div>

            <h1 className="text-primary">Other</h1>
            <div className="flex flex-row gap-2 w-full">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'other')} />
            </div>
        </div>
    );
}
