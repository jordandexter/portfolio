import { ChangeEvent, RefObject, useState, useRef, useEffect } from "react";
import { socials } from "./constants";
import { SocialLink } from "./types";
import { ContactFormContent } from "./ContactFormContent";

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
    const [hoveredSocial, setHoveredSocial] = useState<SocialLink | null>(null)

    return (
        <div className={`flex w-full justify-center items-center flex-col gap-12`}
            style={{
                minHeight: '100dvh'
            }}>
            <ContactFormContent scrollRef={scrollRef} />
        </div>
    );
}
