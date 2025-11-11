import { ChangeEvent, RefObject, useState, useRef, useEffect } from "react";
import { FormInput } from "./FormInput";
import { SectionHeader } from "../Section/SectionHeader";
import { socials } from "./constants";
import { SocialLink } from "./types";

interface ContactFormProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

interface ContactFormData {
    name: string,
    email: string,
    subject: string,
    message: string
}

export function ContactForm({
    scrollRef
}: ContactFormProps) {
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
                        console.log('here')
                    }
                })
            }
        )

        observer.observe(triggerRef.current)
    }, [triggerRef, scrollRef])

    return (
        <div className={`flex w-full justify-center items-center flex-col gap-12`}>
            <div className={`flex justify-center items-center ${animationTrigger ? ' h-150 px-6 py-0 overflow-hidden' : ' px-6 py-0 h-0 max-h-0 overflow-hidden'} flex-col w-full max-w-150 transition-all bg-section-background rounded-[25px] gap-4`}
                style={{
                    transitionDuration: '3000ms'
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


                <button className="flex max-w-100 bg-primary transition-all duration-300 min-w-[150px] rounded-full text-gray-200 py-2 font-bold hover:bg-primary-hover hover:text-white">
                    Submit
                </button>
            </div>



            <div className="flex flex-col gap-3 justify-center items-center">
                <div className="flex flex-row gap-12">
                    {socials.map((social) => {
                        return (
                            <a className="flex flex-col gap-1 justify-center items-center"
                                href={social.link}
                                target="__blank"
                                onMouseEnter={() => setHoveredSocial(social)}
                                onMouseLeave={() => setHoveredSocial(null)}>
                                <div className={`flex ${hoveredSocial == social ? 'bg-primary' : 'bg-section-background'} w-15 h-15 justify-center items-center rounded-full`}>
                                    <social.icon size={24} color={`${hoveredSocial === social ? 'white' : ''}`} />
                                </div>
                                <p className={`${hoveredSocial === social ? 'text-primary' : ''}`}>{social.name}</p>
                            </a>
                        )
                    })}
                </div>
            </div>

            <div ref={triggerRef} className="flex w-full" />
        </div>
    );
}
