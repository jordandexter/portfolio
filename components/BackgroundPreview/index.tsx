import { RefObject, useEffect } from "react";
import { AnimatedParagraph } from "./AnimatedParagraph";
interface BackgroundPreviewProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function BackgroundPreview({
    scrollRef
}: BackgroundPreviewProps) {



    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col w-full max-w-200">
                <p className="flex w-full text-foreground items-start">By Jordan Dexter</p>
                <p className="pb-4">Updated 11-7-2025</p>

                <AnimatedParagraph scrollRef={scrollRef}>
                    <h2>
                        Since I could first pick up a pencil, I wanted to be an artist. Little did I know that
                        the medium I would eventually come to love most was not crayons or colored pencils, but instead pixels
                        and programming languages.
                    </h2>
                </AnimatedParagraph>

                <AnimatedParagraph scrollRef={scrollRef}>
                    <h2>
                        My computer savvy older brother introduced me to Unix and web development quite young, around nine years
                        old. We would <s style={{ textDecoration: 'linethrough' }}>pirate</s> borrow filehosting software to store/share games
                        and movies on our local network, tweaking {`(or attempted to tweak)`} the software as necessary to fit our needs.
                    </h2>
                </AnimatedParagraph>

                <AnimatedParagraph scrollRef={scrollRef}>
                    <h2>
                        As I grew older and DevOps was all the rage at the time, I was influenced by my peers enough to pursue a
                        career in networking as a DevOps engineer, a more pragmatic alternative to pure artistry. This choice
                        greatly dictated my course-load throughout highschool and college which heavily emphisized cloud-based networking,
                        CI/CD, and network architechture.
                    </h2>
                </AnimatedParagraph>

                <AnimatedParagraph scrollRef={scrollRef}>
                    <h2>
                        I became quite familiar with backend tools like Docker and Kubernetes, familiar enough to land my first industry
                        postion as a Junior SysAdmin for a local software company. However, my SysAdmin title didn't last long when I jumped
                        at the opportunity to resdesign their company website.
                    </h2>
                </AnimatedParagraph>
            </div>
        </div>
    );
}
