import { RefObject, useRef, useEffect } from "react";
import { ContactFormContent } from "./ContactFormContent";
import { useFocusedSection } from "@/stores/focusedSection";

interface ContactFormProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export interface ContactFormData {
    name: string,
    email: string,
    subject: string,
    message: string
}

export function ContactForm({
    scrollRef
}: ContactFormProps) {

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { setFocusedSection } = useFocusedSection()

    useEffect(() => {
        if (!scrollRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setFocusedSection('Contact Me')
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [scrollRef, triggerRef])

    return (
        <div className={`flex w-full justify-center items-center flex-col gap-12 py-40`}>
            <div id='Contact Me' ref={triggerRef} className="flex w-full h-0 translate-y-100 pointer-events-none" />
            <ContactFormContent />
        </div>
    );
}
