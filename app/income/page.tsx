"use client"

import Navbar from "@/components/NavBar"
import Income from "@/components/income"
import { useEffect, useState } from "react"

export default function Page() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="h-screen w-screen flex-col">
            <Navbar />
            <div className=" flex justify-center">
                <div className="flex flex-col gap-4">
                <Income />
                <Income />
                <Income />
                <Income />
                <Income />
                <Income />
                <Income />
                </div>
            </div>
            
        </div>
    )
}