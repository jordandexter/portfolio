'use client'
import HeroHeader from "@/components/Hero/Hero";
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
import { ContactUsModal } from "@/modals/ContactUsModal";
import { GithubPreview } from "@/components/GithubPreview";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const [projectModalOpen, setProjectModalOpen] = useState<{ open: boolean, project: Project | null }>({ open: false, project: null })
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)

  const onProjectModalOpen = (project: Project) => {
    setProjectModalOpen({
      open: true,
      project: project
    })
  }

  const onContactModalOpen = () => {
    setContactModalOpen(true)
  }

  return (
    <div className="flex justify-center font-sans">
      <div ref={ref} className="absolute z-9999 pointer-events-none top-0 w-0 min-h-screen" />
      <main className="flex flex-col w-full gap-8 items-center">

        {/* Move these into a store later */}
        {projectModalOpen.open && projectModalOpen.project &&
          <ProjectModal project={projectModalOpen.project} onClose={() => setProjectModalOpen({ open: false, project: null })} />
        }
        {contactModalOpen &&
          <ContactUsModal scrollRef={ref} onClose={() => setContactModalOpen(false)} />
        }

        {ref &&
          <>
            <HeroHeader scrollRef={ref} onOpenContactModal={onContactModalOpen} aboutSectionRef={aboutSectionRef} />
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
