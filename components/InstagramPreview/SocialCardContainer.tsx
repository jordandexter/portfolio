import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { SocialCard } from "./SocialCard"

interface SocialCardContainerProps {
    scrollRef: RefObject<HTMLDivElement | null>
    setImage: Dispatch<SetStateAction<string>>
}

export const SocialCardContainer = ({
    scrollRef,
    setImage,
}: SocialCardContainerProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [animationTrigger, setAnimationTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (!scrollRef.current || !ref.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        setAnimationTrigger(true)
                    }
                })
            }
        )

        observer.observe(ref.current)
    }, [scrollRef, ref])


    return (
        <div className='flex flex-col gap-3'>
            <div className={`flex w-full justify-center transition-all duration-1000 ${animationTrigger ? 'translate-x-0' : 'translate-x-40 opacity-0'}`}>
                <SocialCard
                    username='de.xterart'
                    displayName='Dexter'
                    profileImage='/instagram-profile-picture.png'
                    link='https://www.instagram.com/de.xterart/'
                    image='instagram_logo.png'
                    hoverImage='instagram-hover.png'
                    setImage={setImage} />
            </div>

            <div className={`flex w-full justify-center transition-all duration-1500 ${animationTrigger ? 'translate-x-0' : 'translate-x-40 opacity-0'}`}>
                <SocialCard
                    username='jordandexter'
                    displayName='Jordan Dexter'
                    profileImage='/github-profile-picture.png'
                    link='https://github.com/jordandexter'
                    image='github_logo.png'
                    hoverImage='github-hover.png'
                    setImage={setImage}
                    invert={true} />
            </div>

            <div className={`flex w-full justify-center transition-all duration-2000 ${animationTrigger ? 'translate-x-0' : 'translate-x-40 opacity-0'}`}>
                <SocialCard
                    username='jordan-dexter1'
                    displayName='Jordan Dexter'
                    profileImage='/linkedin-profile-picture.png'
                    link='https://www.linkedin.com/in/jordan-dexter1'
                    image='linkedin_logo.png'
                    setImage={setImage}
                    hoverImage='linkedin-hover.png' />
            </div>

            <div ref={ref} className="flex w-full h-0" />
        </div>
    )
}