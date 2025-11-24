import { RefObject } from "react";
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

    return (
        <div className={`flex w-full justify-center items-center flex-col gap-12`}
            style={{
                minHeight: '100dvh'
            }}>
            <ContactFormContent />
        </div>
    );
}
