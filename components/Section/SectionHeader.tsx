import { RefObject, useRef, useEffect, useState } from "react";

interface SectionHeaderProps {
    heading?: string,
    subheading?: string,
    parentRef: RefObject<HTMLDivElement | null>
}

export const SectionHeader = ({
    heading,
    subheading,
    parentRef
}: SectionHeaderProps) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

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


    if (!subheading && !heading) return null;

    return (
        <>
            <div ref={triggerRef} data-section={heading} className="absolute flex w-full top-[150px]" />
            <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start overflow-y-visible"
                style={{
                    minHeight: heading && subheading ? '60px' : heading && !subheading ? '36px' : subheading && !heading ? '12px' : '0px'
                }}>
                {animationTrigger &&
                    <>
                        {subheading &&
                            <h3 className="text-foreground fade-in">{subheading}</h3>
                        }
                        {heading &&
                            <h1 className="flex text-3xl md:text-5xl bg-clip-text text-transparent inline-block fade-in"
                                style={{
                                    animationDuration: '1000ms',
                                    animationDelay: '200ms',
                                    backgroundImage: 'linear-gradient(to right, #59B5BD, #42a1e0ff, #0f576d)'
                                }}>
                                {heading}
                            </h1>
                        }
                    </>
                }
            </div>
        </>
    )
}