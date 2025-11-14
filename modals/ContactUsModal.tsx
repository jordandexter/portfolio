import { FormInput } from "@/components/ContactForm/FormInput";
import { ContactFormData } from "@/components/ContactForm";
import { SectionHeader } from "@/components/Section/SectionHeader";
import { useState, useEffect, useRef, RefObject, ChangeEvent } from 'react';
import { SocialLink } from "@/components/ContactForm/types";
import { socials } from "@/components/ContactForm/constants";
import { X } from "lucide-react";

interface ContactFormModalProps {
    scrollRef: RefObject<HTMLDivElement | null>
    onClose: () => void
}

export const ContactUsModal = ({
    scrollRef,
    onClose
}: ContactFormModalProps) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState<SocialLink | null>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!scrollRef.current || !triggerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [triggerRef, scrollRef])


    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'


        return () => {
            body.style.overflow = 'visible'
        }
    }, [])

    return (
        <div className="absolute flex items-center justify-center flex-col bg-background z-9999 fade-in gap-3 top-0 w-screen h-screen bg-background relative"
            onScroll={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
            <X className="absolute top-6 right-6 h-10 w-10 cursor-pointer hover:text-white"
                onClick={onClose}
            />
            <div className={`flex items-center flex-col w-full max-w-150 bg-transparent gap-1 md:gap-4 overflow-scroll p-6`}
                style={{
                    scrollbarWidth: 'none'
                }}>
                <SectionHeader
                    heading="Contact Me"
                    subheading="Request Information"
                    parentRef={scrollRef}
                />
                <p className="text-foreground">
                    <span className="text-foreground-emphasized font-bold">Do you have an opening or an opportunity?</span> Let's connect! Fill out the form below and I'll
                    get back to you soon.

                </p>
                <FormInput
                    label="Name"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFormData(prev => ({
                            ...prev,
                            name: e.target.value
                        }))

                    }}
                />
                <FormInput
                    label="Email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFormData(prev => ({
                            ...prev,
                            email: e.target.value
                        }))

                    }}
                />
                <FormInput
                    label="Subject"
                    value={formData.subject}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFormData(prev => ({
                            ...prev,
                            subject: e.target.value
                        }))

                    }}
                />

                <div className="flex w-full flex-col gap-2">
                    <p>Message</p>
                    <textarea
                        value={formData.message}
                        className="flex w-full px-4 py-2 rounded-[16px] min-h-25 w-full bg-contact-form-inputs text-forground"
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                message: e.target.value
                            }))

                        }}
                    />
                </div>


                <button className="flex mt-5 md:mt-0 max-w-100 bg-primary min-w-[150px] rounded-full text-gray-200 py-2 font-bold hover:bg-primary-hover hover:text-white">
                    Submit
                </button>

                <div className="flex flex-col gap-3 justify-center items-center">
                    <div className="flex flex-row gap-12">
                        {socials.map((social) => {
                            return (
                                <a className="flex flex-col justify-center items-center"
                                    href={social.link}
                                    key={social.name}
                                    target="__blank"
                                    onMouseEnter={() => setHoveredSocial(social)}
                                    onMouseLeave={() => setHoveredSocial(null)}>
                                    <div className={`flex ${hoveredSocial == social ? 'bg-primary' : 'bg-section-background'} w-10 h-10 justify-center items-center rounded-full`}>
                                        <social.icon size={24} color={`${hoveredSocial === social ? 'white' : ''}`} />
                                    </div>
                                    <p className={`${hoveredSocial === social ? 'text-primary' : ''}`}>{social.name}</p>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div ref={triggerRef} className="flex w-full" />
        </div>
    );
}
