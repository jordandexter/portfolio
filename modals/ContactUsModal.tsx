import { useEffect, RefObject } from 'react';
import { X } from "lucide-react";
import { ContactFormContent } from '@/components/ContactForm/ContactFormContent';

interface ContactFormModalProps {
    scrollRef: RefObject<HTMLDivElement | null>
    onClose: () => void
}

export const ContactUsModal = ({
    scrollRef,
    onClose
}: ContactFormModalProps) => {

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'
        return () => {
            body.style.overflow = 'visible'
        }
    }, [])

    return (
        <div className="absolute flex items-center justify-center flex-col bg-background z-9999 fade-in gap-3 top-0 w-screen h-screen"
            onScroll={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
            <X className="absolute top-6 right-6 h-10 w-10 cursor-pointer hover:text-white"
                onClick={onClose}
            />
            <ContactFormContent scrollRef={scrollRef} />
        </div>
    );
}
