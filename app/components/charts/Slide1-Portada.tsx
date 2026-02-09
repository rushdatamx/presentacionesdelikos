"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Slide1Portada() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-[#1A1A1A] p-12 font-sans flex flex-col relative overflow-hidden">
      {/* Background accent - animated */}
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] transition-opacity duration-1000 ${
          isLoaded ? "opacity-10" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle at top right, #F7B500 0%, transparent 70%)"
        }}
      />

      {/* Gold accent line - animated width */}
      <div
        className={`absolute top-0 left-0 h-1 bg-[#F7B500] transition-all duration-1000 ease-out ${
          isLoaded ? "w-full" : "w-0"
        }`}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Logo - animated */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Image
            src="/images/delikos-logo.png"
            alt="DELIKOS"
            width={280}
            height={120}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title - animated */}
        <h1
          className={`text-6xl font-bold text-white tracking-tight mb-2 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          DELIKOS <span className="text-[#F7B500] animate-pulse-slow">+</span> MERCO
        </h1>

        {/* Divider - animated */}
        <div
          className={`h-1 bg-[#F7B500] my-6 transition-all duration-700 ${
            isLoaded ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        />

        {/* Subtitle - animated */}
        <h2
          className={`text-2xl text-gray-300 font-light tracking-wide transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          Revision de Negocio 2025
        </h2>

        {/* Date - animated */}
        <div
          className={`mt-12 px-6 py-2 border border-[#F7B500]/30 rounded-full transition-all duration-700 hover:border-[#F7B500] hover:bg-[#F7B500]/10 cursor-pointer ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="text-sm text-[#F7B500]">Febrero 2026</p>
        </div>
      </div>

      {/* Bottom accent - animated */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#F7B500] via-[#F7B500]/50 to-transparent transition-all duration-1000 ease-out ${
          isLoaded ? "w-full" : "w-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      />
    </div>
  )
}
