import { useEffect, useState } from 'react';

type BreakpointAlias = 'sm' | 'md' | 'lg';

export const useScreensize = () => {
    const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointAlias | null>(null);



    useEffect(() => {
        const handleResize = () => {
            const innerWidth = window.innerWidth;
            if (innerWidth) {
                if (innerWidth <= 640) {
                    setCurrentBreakpoint('sm')
                } else if (innerWidth <= 768) {
                    setCurrentBreakpoint('md')
                } else if (innerWidth >= 769) {
                    setCurrentBreakpoint('lg')
                }
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return {
        currentBreakpoint
    }
}