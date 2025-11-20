import { useState, useEffect, useRef, ChangeEvent, RefObject } from 'react';
import { FormInput } from './FormInput';
import { SectionHeader } from '../Section/SectionHeader';
import { ContactFormData } from '.';
import { SocialLink } from './types';
import { init, send } from '@emailjs/browser';
import { Loader2 } from 'lucide-react';
import { socials } from './constants';

interface ContactFormProps {
    scrollRef: RefObject<HTMLDivElement | null>;
}

export const ContactFormContent = ({
    scrollRef
}: ContactFormProps) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const [sending, setSending] = useState(false)
    const [hasSent, setHasSent] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [hoveredSocial, setHoveredSocial] = useState<SocialLink | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    //initialize emailjs
    init({
        publicKey: 'ZE0kfpiCQYWmt-GS3'
    })

    const validateForm = () => {
        setFormError(null);

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (!formData.name.trim()) {
            setFormError("Please enter your name.");
            return false;
        }

        if (!formData.email.trim()) {
            setFormError("Please enter your email.");
            return false;
        }

        if (!emailPattern.test(formData.email)) {
            setFormError("Please enter a valid email (example: name@example.com).");
            return false;
        }

        if (!formData.subject.trim()) {
            setFormError("Please enter a subject.");
            return false;
        }

        if (!formData.message.trim()) {
            setFormError("Please enter a message.");
            return false;
        }

        return true;
    }

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    const onSubmit = async () => {
        setSending(true)

        if (!validateForm()) {
            setSending(false)
            return;
        }

        const data: Record<string, string> = {
            'name': formData.name,
            'email': formData.email,
            'subject': formData.subject,
            'message': formData.subject
        }

        const result = await send('service_6g5malf', 'template_3kphyfl', data)
        setHasSent(true);

        if (result.status !== 200) {
            setError('An unknown error has occured. Try again in a moment')
        } else {
            setSuccess(true)
            resetForm()
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError(null);
            setSuccess(false)
            setHasSent(false)
            setSending(false)
        }, 4000)

    }, [hasSent])


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
        setFormError(null)
    }, [formData])

    return (
        <div className={`flex items-center flex-col w-full max-w-150 bg-transparent gap-1 md:gap-4 overflow-scroll p-6 ${sending && !hasSent ? 'opacity-50' : ''}`}
            style={{
                scrollbarWidth: 'none'
            }}>
            {!hasSent ? (
                <>
                    <SectionHeader
                        heading="Contact Me"
                        postion='center'
                        subheading="Request Information"
                        parentRef={scrollRef}
                    />

                    {formError &&
                        <div className="bg-red-500/10 w-full min-h-10 flex justify-center items-center border-1 border-red-500 fade-in rounded-[10px]">
                            <p className="text-red-400">{formError} </p>
                        </div>
                    }

                    <p className="text-foreground">
                        <span className="text-foreground-emphasized font-bold">Do you have an opening or an opportunity?</span> Let's connect! Fill out the form below and I'll
                        get back to you soon.

                    </p>
                    <FormInput
                        label="Name *"
                        value={formData.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFormData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))

                        }}
                    />
                    <FormInput
                        label="Email *"
                        value={formData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFormData(prev => ({
                                ...prev,
                                email: e.target.value
                            }))

                        }}
                    />
                    <FormInput
                        label="Subject *"
                        value={formData.subject}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFormData(prev => ({
                                ...prev,
                                subject: e.target.value
                            }))

                        }}
                    />

                    <div className="flex w-full flex-col gap-2">
                        <p>Message *</p>
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


                    <button type='button' disabled={sending} onClick={onSubmit} className={`flex gap-2 mt-5 md:mt-0 ${sending ? 'bg-transparent' : 'bg-primary max-w-100'} min-w-[150px] rounded-full text-gray-200 py-2 font-bold hover:bg-primary-hover hover:text-white`}>
                        {sending ? 'Submitting...' : 'Submit'}
                        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
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
                </>
            ) : (
                success ? (
                    <>
                        <p className="text-green-700 font-bold fade-in">Submitted successfully. Thank you.</p>
                    </>
                ) : (
                    <>
                        <p className="text-red-700 font-bold">{error}</p>
                    </>

                )
            )}

        </div>

    )
}