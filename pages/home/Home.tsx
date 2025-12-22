"use client"
import HeroHeader from "@/components/Hero";
import { useRef } from "react";
import { ProjectPreview } from "@/components/ProjectPreview";
import { TechnologiesPreview } from "@/components/TechnologiesPreview"
import { GraphicDesignPreview } from "@/components/GraphicDesignPreview";
import { Section } from "@/components/Section";
import { BackgroundStickySection } from "@/components/BackgroundStickySection";
import { BackgroundPreview } from "@/components/BackgroundPreview";
import { ContactForm } from "@/components/ContactForm";
import { StatisticsPreview } from "@/components/StatisticsPreview";
import { GithubPreview } from "@/components/GithubPreview";
import { InstagramPreview } from "@/components/InstagramPreview";
import { ComponentPreview } from "@/components/ComponentPreview";
import { SpacialEffect } from "@/components/SpacialEffect";

export default function Home() {
    const ref = useRef<HTMLDivElement>(null);
    const aboutSectionRef = useRef<HTMLDivElement>(null)

    return (
        <div className="flex justify-center font-sans">
            <div ref={ref} className="absolute z-9999 pointer-events-none top-0 w-0 min-h-screen" />
            <SpacialEffect />
            <main className="flex flex-col w-full gap-8 items-center">
                {ref &&
                    <>
                        <HeroHeader scrollRef={ref} aboutSectionRef={aboutSectionRef} />
                        <div className="flex flex-col w-full z-1 bg-section-background rounded-t-[50px]"
                            style={{
                                boxShadow: '0 -10px 40px 0 rgba(65, 65, 65, 0.1)'
                            }}>

                            <Section
                                heading="Case Studies"
                                subheading="Projects"
                                paragraphEmphasized="Here are a few of my favorites."
                                paragraphText="These projects showcase not only my creativity, but also my experience working across multiple technologies each with a unique stack."
                                parentRef={ref}>
                                <ProjectPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Technologies"
                                subheading="Skillset"
                                parentRef={ref}
                                variant='dark'>
                                <TechnologiesPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Let's Talk Numbers"
                                subheading="Statistics"
                                paragraphEmphasized="Nerds love stats."
                                paragraphText="I'm certainly not the exception. Here are a few I think you'll enjoy."
                                position="center"
                                parentRef={ref}
                                variant="darkest">
                                <StatisticsPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Graphic Design"
                                subheading="Branding"
                                paragraphEmphasized="Beautiful websites begin with good design."
                                paragraphText="Creating elegant, visually appealing designs has been a lifelong hobby. Here's some of my graphic work."
                                parentRef={ref}
                                variant='darkest'>
                                <GraphicDesignPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Simple, Elegant, familiar."
                                subheading="Philosophy"
                                paragraphEmphasized="Simplicity is the ultimate sophistication."
                                paragraphText="Let the UI stay intuitive and unobtrusive. Allow just enough creative flair to make it memorable."
                                position="center"
                                parentRef={ref}
                                variant='darkest'>
                                <ComponentPreview scrollRef={ref} />
                            </Section>

                            <BackgroundStickySection
                                heading="Background"
                                subheading="About"
                                parentRef={ref}
                                variant="darkest">
                                <BackgroundPreview scrollRef={ref} backgroundPreviewRef={aboutSectionRef} />
                            </BackgroundStickySection>

                            <Section
                                heading="Let's Connect"
                                subheading="Socials"
                                position="center"
                                paragraphEmphasized="Thanks for taking a look."
                                paragraphText="If you like what you see, feel free to give a follow. Here are my main socials."
                                parentRef={ref}
                                variant="darkest">
                                <InstagramPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Crafted With Love"
                                subheading="Repository"
                                paragraphEmphasized="Check out this repository on Github."
                                paragraphText="Maybe leave a star, a nice message, or explore a few of my other projects."
                                position="center"
                                parentRef={ref}
                                variant="darkest">
                                <GithubPreview scrollRef={ref} />
                            </Section>

                            <Section
                                parentRef={ref}
                                variant="dark">
                                <ContactForm scrollRef={ref} />
                            </Section>
                        </div>

                    </>
                }
            </main>
        </div >
    );
}

