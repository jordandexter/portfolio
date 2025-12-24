"use client"
import { tools } from "./constants";
import { RefObject, useState } from "react";
import { TechnologiesSlider } from "./TechnologiesSlider";
import { AnimatedText } from "../AnimatedText";
import { SliderItem } from "./types";
import { Code2 } from "lucide-react";

interface TechnologiesPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>;
}

export function TechnologiesPreview({
    scrollRef
}: TechnologiesPreviewProps
) {
    const [hoveredIcon, setHoveredIcon] = useState<SliderItem | null>(null)

    return (
        <div className="flex w-full flex-col gap-6 scrollbar-hide"
            style={{
                scrollbarWidth: 'none'
            }}>
            <div className="flex flex-wrap md:flex-nowrap gap-0 lg:justify-between relative">

                <AnimatedText
                    showAnimatedText={true}
                    scrollRef={scrollRef}
                    className={`${hoveredIcon ? 'opacity-0 md:opacity-100' : ''} transition-opacity duration-400`}
                    align='left'
                    delay={400}
                >
                    <span className="text-foreground-emphasized">Frontend focused. Backend trained.</span> With my formal training in network infrastructure and DevOps, I not only implement your application, but guarantee performance and longevity.
                </AnimatedText>

                {hoveredIcon &&
                    <div className="absolute md:right-0 flex flex-col w-full md:max-w-[400px] fade-in border-1 p-3 bg-section-background rounded-[15px]">
                        <h1 className="w-full flex justify-center pl-1 text-sm">{hoveredIcon.name}</h1>
                        <div className="flex flex-row gap-3 h-full justify-center items-center">
                            {hoveredIcon.Icon ? (

                                <hoveredIcon.Icon size={35} className="flex h-full text-primary" />
                            ) : (
                                <Code2 size={36} />
                            )}

                            <div className="flex flex-col w-full">
                                <div className="flex w-full justify-between flex-row gap-3">
                                    <div className="flex flex-row justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xl text-foreground-emphasized">Mastery:</h1>
                                        <h1 className="text-xl text-primary">{hoveredIcon.mastery ? hoveredIcon.mastery : 'Learning'}</h1>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between">
                                    <h1 className="whitespace-nowrap ">Experience:</h1>
                                    <h1>{hoveredIcon.yearsExperience} years</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                }

            </div>

            <h1 className="text-primary">Frontend</h1>
            <div className="flex flex-row gap-2 w-full relative">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'frontend')} setHoveredIcon={setHoveredIcon} />
            </div>


            <h1 className="text-primary">Backend</h1>
            <div className="flex flex-row gap-2 w-full">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'backend')} setHoveredIcon={setHoveredIcon} />
            </div>

            <h1 className="text-primary">Other</h1>
            <div className="flex flex-row gap-2 w-full">
                <TechnologiesSlider scrollRef={scrollRef} items={tools.filter((tools) => tools.type === 'other')} setHoveredIcon={setHoveredIcon} />
            </div>
        </div>
    );
}
