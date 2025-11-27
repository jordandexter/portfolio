"use client"
import { RefObject, ReactNode, useState } from "react";
import { SectionHeader } from "./SectionHeader";

interface SectionProps {
    heading?: string,
    subheading?: string,
    position?: 'center' | 'left' | 'right',
    parentRef: RefObject<HTMLDivElement | null>,
    variant?: 'dark' | 'darkest'
    children?: ReactNode

}

export function Section({
    heading,
    subheading,
    position = 'left',
    parentRef,
    variant,
    children
}: SectionProps) {
    const background = !variant ? 'bg-background-section' : variant === 'dark' ? 'bg-section-background-dark' : 'bg-section-background-darkest'


    return (
        <div className={`flex px-10 min-h-100 w-full max-w-[100vw] overflow-hidden justify-center items-center flex-col py-12 relative ${background}`} >
            <div className="flex flex-col w-full max-w-[1000px] gap-6">
                <SectionHeader
                    heading={heading}
                    postion={position}
                    subheading={subheading}
                    parentRef={parentRef}
                />
                {children}
            </div>
        </div >
    );
}
