// components/CurrentTime.tsx
'use client'
import { useEffect, useState } from 'react'

export function CurrentTime() {
    const [time, setTime] = useState('')

    useEffect(() => {
        setTime(new Date().toLocaleTimeString())
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return <div>Current time: {time}</div>
}