import { RefObject, useRef } from "react";
import { AnimatedText } from "../AnimatedText";

interface ComponentPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function ComponentPreview({
    scrollRef
}: ComponentPreviewProps) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className="flex w-full flex-col gap-5 scrollbar-hide">
            <AnimatedText
                delay={400}
                align="left"
                scrollRef={scrollRef}>
                <span className="text-foreground-emphasized inline">
                    Simplicity is the ultimate sophistication.
                </span>{" "} Let the UI stay intuitive and unobtrusive — allow just
                enough creative flair to make it memorable.
            </AnimatedText>
        </div>
    );
}
