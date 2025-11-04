"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const SHOW_CONTAINER_NAMES = false

export function DefaultHomePage() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const container1 = useTransform(scrollYProgress, [0, 0.2], ["100%", "0%"]);

    return (
        <div ref={ref} className="absolute sticky w-full h-screen overflow-hidden relative grid place-items-center gap-10 p-15 border-2 border-red-200">
            <motion.div className="flex gap-10 flex-col md:flex-row min-h-200 relative w-full" style={{
                opacity: container1
            }}>
                {SHOW_CONTAINER_NAMES && <p className="absolute text-red-500 font-bold">container 1</p>}
                <div className="flex flex-1 rounded-xl min-h-100" style={{
                    backgroundImage: 'linear-gradient(to right, #fffd75ff , #61fff2ff)'
                }}>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <h2>Front-end Developer</h2>
                    <h1 className="text-5xl fade-in"
                        style={{ animationDuration: '1000ms' }}>Jordan Dexter</h1>
                    <p className="fade-in" style={{ animationDuration: '1000ms', animationDelay: '1s' }}>
                        The only thing more rewarding than building a product you believe in is seeing it succeed.

                        <br></br><br></br>

                        Here are some of mine.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}