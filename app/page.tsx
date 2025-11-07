'use client'
import { HeroHeader } from "@/pages/Home";
import { useEffect, useRef, useState } from "react";
import { ProjectPreview } from "@/components/ProjectPreview";
import { TechnologiesPreview } from "@/components/TechnologiesPreview"
import { GraphicDesignPreview } from "@/components/GraphicDesignPreview";
import { Section } from "@/components/Section";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const graphicDesignRef = useRef<HTMLDivElement>(null)

  const [triggerGraphicDesign, setTriggerGraphicDesign] = useState<boolean>(false)

  useEffect(() => {
    if (!ref.current
      || !graphicDesignRef.current
    ) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {

            switch (entry.target.getAttribute("data-section")) {
              case 'graphic-design':
                setTriggerGraphicDesign(true)
                break;
              default:
                break;
            }
          }
        })
      }
    )

    observer.observe(graphicDesignRef.current)
  }, [graphicDesignRef])

  return (
    <div className="flex justify-center font-sans relative">
      <main ref={ref} className="flex flex-col w-full gap-8 items-center">
        {ref &&
          <>
            <HeroHeader scrollRef={ref} />
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
                heading=""
                subheading=""
                parentRef={ref}
                variant="darkest">

              </Section>

            </div>

          </>
        }

      </main>

    </div >
  );
}
