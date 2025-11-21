import { tools } from "./constants";
import { RefObject, useState, useRef, useEffect } from "react";
import { TechnologiesSlider } from "./TechnologiesSlider";
import { AnimatedText } from "../AnimatedText";

interface TechnologiesPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>;
}

export function TechnologiesPreview({
    scrollRef
}: TechnologiesPreviewProps
) {
    return (
        <div className="flex w-full flex-col gap-6 scrollbar-hide"
            style={{
                scrollbarWidth: 'none'
            }}>

            <AnimatedText
                scrollRef={scrollRef}
                delay={200}>
                <span className="text-foreground-emphasized">Frontend focused. Backend trained.</span> With my formal training in network infrastructure and DevOps, I not only
                implement your application, but guarantee performance and longevity.
            </AnimatedText>

            <h1 className="text-primary">Frontend</h1>
            <div className="flex flex-row gap-2 w-full relative">
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
