import { RefObject } from "react";
import { SectionHeader } from "../Section/SectionHeader";
import { stats } from "./constants";
import { StatisticsRow } from "./StatisticsRow";

interface StatisticsPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function StatisticsPreview({
    scrollRef
}: StatisticsPreviewProps) {
    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col gap-6 max-w-200">
                <SectionHeader
                    heading="Let's talk numbers"
                    subheading="Statistics"
                    parentRef={scrollRef}
                />

                <div className="flex flex-col gap-3 max-w-200">
                    <StatisticsRow scrollRef={scrollRef} stats={stats.slice(0, 3)} />
                    <StatisticsRow scrollRef={scrollRef} stats={stats.slice(3, 5)} />
                    <StatisticsRow scrollRef={scrollRef} stats={stats.slice(5, 8)} />
                </div>
            </div>
        </div>
    );
}
