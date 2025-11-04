'use client'
import { DefaultHomePage } from "@/pages/Home";
import { useState } from "react";

export default function Home() {
  const [displayMode, setDisplayMode] = useState<'light' | 'dark'>('light')

  return (
    <div className="flex items-center justify-center font-sans  relative">
      <main className="flex flex-col min-h-screen gap-8 flex-1 items-center">
        <DefaultHomePage />
        <div className="flex w-full min-h-200"></div>
        <div className="flex w-full min-h-200"></div>
        <div className="flex w-full min-h-200"></div>
        <div className="flex w-full min-h-200"></div>
      </main>
    </div>
  );
}
