'use client'
import { useFocusedSection } from "@/stores/focusedSection"
import { ArrowRight, MenuIcon } from "lucide-react"
import { useState } from "react"

interface NavButton {
    title: string,
    heading: string
}

const navOptions: NavButton[] = [
    { title: 'Home', heading: 'Home' },
    { title: 'Work', heading: 'Case Studies' },
    { title: 'About', heading: 'Background' },
    { title: 'Social', heading: `Let's Connect` },
    { title: 'Contact', heading: 'Contact Me' },
]

export function Header() {
    const { focusedSection } = useFocusedSection()
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    return (
        <div className="fixed rounded-full w-full bg-transparent z-99 flex justify-center p-4">
            <div className="flex flex-col md:flex-row max-w-350 w-full rounded-[10px] border-1 border-black/10 bg-gray-500/20 p-4 justify-between gap-5 transition-all duration-300" style={{
                backdropFilter: 'blur(40px)'
            }}>
                <div className="h-8 w-8 rounded-full overflow-hidden hidden md:flex">
                    <img src='/IMG_4202.jpg' />
                </div>
                <div className="md:flex hidden">
                    {navOptions.map((opt) => {
                        return (
                            <button key={opt.heading} className={`${opt.heading === focusedSection ? 'text-primary font-bold  border-primary' : 'text-white/50 hover:text-white/70'}`}
                                onClick={() => {
                                    const sectionDiv = document.getElementById(opt.heading)
                                    if (!sectionDiv) return;

                                    const top = sectionDiv.getBoundingClientRect().top + window.pageYOffset - 150;

                                    window.scrollTo({
                                        top: top,
                                        behavior: 'instant'
                                    })
                                }}>
                                {opt.title}
                            </button>
                        )
                    })}
                </div>
                <div className="hidden md:flex opacity-0 w-8 rounded-full overflow-hidden hidden md:flex">
                    <img src='/IMG_4202.jpg' />
                </div>
                <div className="flex md:hidden justify-between">
                    <div className="h-8 w-8 rounded-full overflow-hidden flex">
                        <img src='/IMG_4202.jpg' />
                    </div>
                    <button className={`hover:text-white ${showMobileMenu ? 'text-white' : ''}`}
                        onClick={() => {
                            setShowMobileMenu(!showMobileMenu)

                        }}>
                        <MenuIcon />
                    </button>
                </div>


                <div className={`${showMobileMenu ? 'flex flex-col md:hidden justify-end' : 'hidden'}`}>
                    {navOptions.map((opt) => {
                        return (
                            <button key={opt.heading} className={`w-full py-10 hover:bg-gray-400/20 rounded-[10px] hover:text-white flex justify-start items-start ${opt.heading === focusedSection ? 'text-primary font-bold  border-primary' : 'text-white/50 hover:text-white/70'}`}
                                onClick={() => {
                                    setShowMobileMenu(false)
                                    const sectionDiv = document.getElementById(opt.heading)
                                    if (!sectionDiv) return;

                                    const top = sectionDiv.getBoundingClientRect().top + window.pageYOffset;
                                    window.scrollTo({
                                        top: top,
                                        behavior: 'smooth'
                                    })
                                }}>
                                <p className="w-full flex justify-between ">
                                    {opt.title}
                                    <ArrowRight />
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}