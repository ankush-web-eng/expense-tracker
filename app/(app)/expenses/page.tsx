"use client"

import Navbar from "@/components/NavBar"
import Expense from "@/components/expense"
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
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                </div>
            </div>
            
        </div>
    )
}