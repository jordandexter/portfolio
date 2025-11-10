'use client'
import { HeroHeader } from "@/pages/Home";
import { useEffect, useRef, useState } from "react";
import { ProjectPreview } from "@/components/ProjectPreview";
import { TechnologiesPreview } from "@/components/TechnologiesPreview"
import { GraphicDesignPreview } from "@/components/GraphicDesignPreview";
import { Section } from "@/components/Section";
import { BackgroundPreview } from "@/components/BackgroundPreview";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex justify-center font-sans relative">
      <main ref={ref} className="flex flex-col w-full gap-8 items-center border-2 border-red-400">
        {ref &&
          <>
            <HeroHeader scrollRef={ref} aboutSectionRef={aboutSectionRef} />
            <div className="flex flex-col w-full z-1 bg-section-background rounded-t-[50px] overflow-hidden"
              style={{
                boxShadow: '0 -10px 40px 0 rgba(65, 65, 65, 0.1)'
              }}>

              <Section
                heading="Recent Additions"
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
                heading="Graphic Design"
                subheading="Branding"
                parentRef={ref}
                variant='darkest'>
                <GraphicDesignPreview scrollRef={ref} />
              </Section>


              <Section
                heading="Background"
                subheading="About"
                parentRef={ref}
                variant="darkest">
                <BackgroundPreview scrollRef={ref} backgroundPreviewRef={aboutSectionRef} />

              </Section>

            </div>

          </>
        }

      </main>

    </div >
  );
}
