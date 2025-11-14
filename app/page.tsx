'use client'
import HeroHeader from "@/pages/Home";
import { useEffect, useRef, useState } from "react";
import { ProjectPreview } from "@/components/ProjectPreview";
import { TechnologiesPreview } from "@/components/TechnologiesPreview"
import { GraphicDesignPreview } from "@/components/GraphicDesignPreview";
import { Section } from "@/components/Section";
import { StickySection } from "@/components/StickySection";
import { BackgroundPreview } from "@/components/BackgroundPreview";
import { ContactForm } from "@/components/ContactForm";
import { StatisticsPreview } from "@/components/StatisticsPreview";
import { ProjectModal } from "@/modals/ProjectModal";
import { Project } from "@/components/ProjectPreview/types";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const [projectModalOpen, setProjectModalOpen] = useState<{ open: boolean, project: Project | null }>({ open: false, project: null })

  const onProjectModalOpen = (project: Project) => {
    setProjectModalOpen({
      open: true,
      project: project
    })
  }

  return (
    <div className="flex justify-center font-sans">
      <main ref={ref} className="flex flex-col w-full gap-8 items-center">
        {projectModalOpen.open && projectModalOpen.project &&
          <ProjectModal project={projectModalOpen.project} onClose={() => setProjectModalOpen({ open: false, project: null })} />
        }
        {ref &&
          <>
            <HeroHeader scrollRef={ref} aboutSectionRef={aboutSectionRef} />
            <div className="flex flex-col w-full z-1 bg-section-background rounded-t-[50px]"
              style={{
                boxShadow: '0 -10px 40px 0 rgba(65, 65, 65, 0.1)'
              }}>

              <Section
                heading="Recent Additions"
                subheading="Projects"
                parentRef={ref}>
                <ProjectPreview scrollRef={ref} onProjectModalOpen={onProjectModalOpen} />
              </Section>

              <Section
                heading="Technologies"
                subheading="Skillset"
                parentRef={ref}
                variant='dark'>
                <TechnologiesPreview scrollRef={ref} />
              </Section>

              <Section
                parentRef={ref}
                variant="dark">
                <StatisticsPreview scrollRef={ref} />
              </Section>

              <Section
                heading="Graphic Design"
                subheading="Branding"
                parentRef={ref}
                variant='darkest'>
                <GraphicDesignPreview scrollRef={ref} />
              </Section>

              <StickySection
                heading="Background"
                subheading="About"
                parentRef={ref}
                variant="darkest">
                <BackgroundPreview scrollRef={ref} backgroundPreviewRef={aboutSectionRef} />
              </StickySection>

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
