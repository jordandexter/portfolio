
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page not found"
}

export default function Custom404() {
    return (
        <div className="flex justify-center font-sans h-screen items-center flex-col gap-5">
            <img className="" style={{
                filter: 'saturate(0)'
            }} src={`404.gif`} />
            <h2 className="font-normal  text-xl md:text-3xl text-white">404 | Page not found</h2>
            <p>Well this is embarassing.</p>
        </div>
    )
}