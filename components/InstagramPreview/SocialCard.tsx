import { Dispatch, SetStateAction } from "react"

interface SocialCardProps {
    username: string,
    displayName: string,
    link: string,
    image: string
    hoverImage: string,
    setImage: Dispatch<SetStateAction<string>>,
    invert?: boolean
}
export const SocialCard = ({
    username,
    displayName,
    link,
    image,
    invert,
    hoverImage,
    setImage
}: SocialCardProps) => {

    return (
        <div className='flex flex-col bg-section-background-dark/50 hover:bg-section-background border cursor-default border-gray-800 rounded-[15px] p-6 gap-3 items-center justify-center'
            onMouseEnter={() => setImage(hoverImage)}>
            <div className='flex justify-center items-center'>
                <img className='object-cover w-40' src={image}
                    style={{
                        filter: invert ? 'brightness(1) invert(1)' : ''
                    }}
                    height={100} width={300} />

            </div>
            <div className='flex flex-row gap-3 whitespace-nowrap w-full justify-between items-center'
                style={{
                    WebkitBackdropFilter: 'blur(10px)'
                }}>

                <div className="flex flex-row gap-3">
                    <div className='h-10 w-10 rounded-full bg-white'></div>
                    <div className='flex flex-col leading-5'>
                        <h1 className='text-foreground-emphasized whitespace-nowrap'>{displayName}</h1>
                        <h2>@{username}</h2>
                    </div>
                </div>
                <a href={link} className='flex justify-center items-center bg-primary px-5 rounded-full text-white font-bold hover:bg-primary-hover'>View</a>
            </div>
        </div>
    )
}