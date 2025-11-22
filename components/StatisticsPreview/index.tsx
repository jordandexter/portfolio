import { RefObject } from "react";
import { SectionHeader } from "../Section/SectionHeader";
import { industryStats, personalStats } from "./constants";
import { StatisticsRow } from "./StatisticsRow";
import { AnimatedText } from "../AnimatedText";

interface StatisticsPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function StatisticsPreview({
    scrollRef
}: StatisticsPreviewProps) {
    return (
        <div className="flex w-full justify-center flex-col gap-6">
            <SectionHeader
                heading="Let's talk numbers"
                subheading="Statistics"
                postion="center"
                parentRef={scrollRef}
            />

            <AnimatedText
                delay={400}
                align="center"
                scrollRef={scrollRef}>
                <span className="text-foreground-emphasized">Nerds love stats.</span> I'm certainly not the exception. Here are a few I
                think you'll enjoy.
            </AnimatedText>

            <div className="flex w-full justify-center flex-col gap-2">
                <h1 className="text-primary">Industry</h1>
                <div className="flex flex-col gap-6 justify-center items-center">
                    <div className="flex flex-col gap-3">
                        <StatisticsRow stats={industryStats.slice(0, 3)} />
                        <StatisticsRow stats={industryStats.slice(3, 5)} />
                        <StatisticsRow stats={industryStats.slice(5, 8)} />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center flex-col gap-2">
                <h1 className="text-primary">Personal</h1>
                <div className="flex flex-col gap-6 justify-center items-center">
                    <div className="flex flex-col gap-3">
                        <StatisticsRow stats={personalStats.slice(0, 3)} />
                        <StatisticsRow stats={personalStats.slice(3, 4)} />
                        <StatisticsRow stats={personalStats.slice(4, 8)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
