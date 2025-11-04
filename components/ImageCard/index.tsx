"use client"
import Image from "next/image"
import { useState } from "react"
import { MouseEvent } from "react"

interface ImageCardProps {
    src: string
}

interface Styles {
    x: number,
    y: number,
}

export const ImageCard = ({
    src
}: ImageCardProps) => {
    const [coords, setCoords] = useState<Styles>({ x: -500, y: -500 })

    const handleSetStyles = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCoords({
            x: e.clientX - rect.left - 200,
            y: e.clientY - rect.top - 200,
        })
    }

    const handleMouseLeave = () => {
        setCoords({
            x: -500,
            y: -500,
        })
    }

    return (
        <div className="flex rounded-2xl  overflow-hidden cursor-pointer relative transition-all duration-200"
            onMouseMove={handleSetStyles}
            onMouseLeave={handleMouseLeave}>
            <div className="absolute flex h-100 w-100" style={{
                backgroundImage: 'radial-gradient(circle, #80bafcff, transparent)',
                filter: 'blur(20px)',
                opacity: 0.1,
                top: `${coords.y}px`,
                left: `${coords.x}px`,
            }}></div>
            <Image src={src} alt={src} height={1000} width={350} />
        </div>
    )
}