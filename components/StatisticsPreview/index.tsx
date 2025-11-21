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
        <div className="flex w-full justify-center flex-col gap-6">
            <SectionHeader
                heading="Let's talk numbers"
                subheading="Statistics"
                postion="center"
                parentRef={scrollRef}
            />
            <div className="flex flex-col gap-6 w-full justify-center items-center">
                <div className="flex flex-col gap-3 max-w-200">
                    <StatisticsRow stats={stats.slice(0, 3)} />
                    <StatisticsRow stats={stats.slice(3, 5)} />
                    <StatisticsRow stats={stats.slice(5, 8)} />
                </div>
            </div>
        </div>
    );
}
