"use client"
import HeroHeader from "@/components/Hero";
import { useEffect, useRef } from "react";
import { ProjectPreview } from "@/components/ProjectPreview";
import { TechnologiesPreview } from "@/components/TechnologiesPreview"
import { GraphicDesignPreview } from "@/components/GraphicDesignPreview";
import { Section } from "@/components/Section";
import { StickySection } from "@/components/StickySection";
import { BackgroundPreview } from "@/components/BackgroundPreview";
import { ContactForm } from "@/components/ContactForm";
import { StatisticsPreview } from "@/components/StatisticsPreview";
import { GithubPreview } from "@/components/GithubPreview";
import { InstagramPreview } from "@/components/InstagramPreview";
import { ComponentPreview } from "@/components/ComponentPreview";
import { ModalContainer } from "@/modals";
import { useState } from "react";

export default function Home() {
    const ref = useRef<HTMLDivElement>(null);
    const aboutSectionRef = useRef<HTMLDivElement>(null)

    return (
        <div className="flex justify-center font-sans">
            <div ref={ref} className="absolute z-9999 pointer-events-none top-0 w-0 min-h-screen" />
            <main className="flex flex-col w-full gap-8 items-center">
                <ModalContainer />
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
                                position="center"
                                parentRef={ref}
                                variant="darkest">
                                <StatisticsPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Graphic Design"
                                subheading="Branding"
                                parentRef={ref}
                                variant='darkest'>
                                <GraphicDesignPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Simple, Elegant, familiar."
                                subheading="Philosophy"
                                position="center"
                                parentRef={ref}
                                variant='darkest'>
                                <ComponentPreview scrollRef={ref} />
                            </Section>

                            <StickySection
                                heading="Background"
                                subheading="About"
                                parentRef={ref}
                                variant="darkest">
                                <BackgroundPreview scrollRef={ref} backgroundPreviewRef={aboutSectionRef} />
                            </StickySection>

                            <Section
                                heading="Let's Connect"
                                subheading="Socials"
                                parentRef={ref}
                                variant="darkest">
                                <InstagramPreview scrollRef={ref} />
                            </Section>

                            <Section
                                heading="Crafted With Love"
                                subheading="Repository"
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

