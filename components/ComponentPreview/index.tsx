"use client"
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
        </div>
    );
}
