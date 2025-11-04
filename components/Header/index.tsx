'use client'
import { useState } from "react"

export function Header() {
    const [displayMode, setDisplayMode] = useState<'light' | 'dark'>('dark')

    const handleModeChange = () => {
        const body = document.getElementsByTagName('body')[0]
        if (!body) return;

        if (displayMode === 'light') {
            body.className = body.className + ' dark'
            setDisplayMode('dark')
        }
        else {
            body.className = body.className.replace(' dark', '')
            setDisplayMode('light')
        }
    }

    return (
        <header className="absolute top-0 sticky flex w-full bg-transparent">
            <button className="flex bg-gray-600 rounded-sm p-2 m-2" onClick={handleModeChange}>
                {displayMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    )
}