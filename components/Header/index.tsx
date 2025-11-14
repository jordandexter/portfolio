'use client'
import { Lightbulb } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
    const [displayMode, setDisplayMode] = useState<'light' | 'dark' | null>(null)

    const getThemeCookie = () => {
        return localStorage.getItem('theme-preference')
    }

    const setThemeCookie = (mode: 'light' | 'dark') => {
        localStorage.setItem('theme-preference', mode)
    }

    const changeMode = (newMode: 'light' | 'dark') => {
        const body = document.getElementsByTagName('body')[0]
        if (!body) return;

        if (newMode === 'dark') {
            body.className = body.className + ' dark'
            setThemeCookie('dark')

        }
        else {
            body.className = body.className.replace(' dark', '')
            setThemeCookie('light')
        }
    }

    const handleModeChange = () => {
        if (displayMode === 'dark')
            setDisplayMode('light')
        else
            setDisplayMode('dark')
    }

    useEffect(() => {
        const cookie = getThemeCookie()

        if (cookie && (cookie === 'light' || cookie === 'dark')) {
            const body = document.getElementsByTagName('body')[0]

            if (body) {
                body.className = body.className.replace('hidden', '')
            }

            setDisplayMode(cookie)
        } else {
            setDisplayMode('light')
        }
    }, [])


    useEffect(() => {
        if (displayMode) {
            changeMode(displayMode)
        }
    }, [displayMode])

    return (
        <div className="absolute rounded-full top-0 h-12 flex w-full bg-transparent z-99">
            <button className="flex" onClick={handleModeChange}>
                <Lightbulb className={`transition-all duration-200 rounded-full h-10 w-10 p-2 text-foreground ${displayMode === 'light' ? 'hover:bg-black/10' : 'hover:bg-white/20'}`} />
            </button>
        </div>
    )
}