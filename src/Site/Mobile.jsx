import { useState, useEffect } from 'react'

export default function Mobile() 
{
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => 
    {
        const checkIfMobile = () => 
        {
            const width = window.innerWidth
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            
            setIsMobile(width <= 780 && isTouchDevice);
        }

        checkIfMobile()

        window.addEventListener('resize', checkIfMobile)

        return () => 
        {
            window.removeEventListener('resize', checkIfMobile)
        }

    }, [isMobile])

    return isMobile
}
