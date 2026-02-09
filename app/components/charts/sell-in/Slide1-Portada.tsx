"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  white: "#FFFFFF",
}

export default function Slide1Portada() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="w-[1280px] h-[720px] font-sans flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: COLORS.dark }}
    >
      {/* Background Accent - animated */}
      <div
        className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-1000 ${
          isLoaded ? "opacity-10" : "opacity-0"
        }`}
        style={{ backgroundColor: COLORS.gold }}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl transition-opacity duration-1000 ${
          isLoaded ? "opacity-5" : "opacity-0"
        }`}
        style={{ backgroundColor: COLORS.gold, transitionDelay: "300ms" }}
      ></div>

      {/* Logo - animated */}
      <div
        className={`mb-12 relative z-10 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <Image
          src="/images/delikos-logo.png"
          alt="Delikos"
          width={400}
          height={200}
          className="object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
          priority
        />
      </div>

      {/* Title - animated */}
      <h1
        className={`text-5xl font-bold text-white tracking-tight text-center relative z-10 mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        Resultados Sell-In 2025
      </h1>

      {/* Subtitle - animated */}
      <p
        className={`text-xl text-gray-400 text-center relative z-10 mb-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        Clientes Prioritarios
      </p>

      {/* Client Badges - animated with hover */}
      <div className="flex items-center gap-4 relative z-10 mb-16">
        {["HEB", "MERCO", "FUTURAMA"].map((cliente, index) => (
          <div
            key={cliente}
            className={`px-6 py-3 rounded-full border-2 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${
              hoveredClient === cliente
                ? "scale-110 shadow-lg"
                : hoveredClient !== null
                ? "opacity-50"
                : "hover:scale-105"
            }`}
            style={{
              borderColor: COLORS.gold,
              color: hoveredClient === cliente ? COLORS.dark : COLORS.gold,
              backgroundColor: hoveredClient === cliente ? COLORS.gold : "transparent",
              transitionDelay: `${800 + index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredClient(cliente)}
            onMouseLeave={() => setHoveredClient(null)}
          >
            {cliente}
          </div>
        ))}
      </div>

      {/* Date - animated */}
      <div
        className={`absolute bottom-12 text-gray-500 text-sm relative z-10 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{ transitionDelay: "1100ms" }}
      >
        <div className="px-6 py-2 border border-gray-700 rounded-full hover:border-amber-500 hover:text-amber-500 transition-all duration-300 cursor-pointer">
          Febrero 2026
        </div>
      </div>

      {/* Decorative Line - animated */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#F7B500] via-[#F7B500] to-transparent transition-all duration-1000 ease-out ${
          isLoaded ? "w-full" : "w-0"
        }`}
        style={{ backgroundColor: COLORS.gold }}
      ></div>

      {/* Top line - animated */}
      <div
        className={`absolute top-0 right-0 h-1 bg-gradient-to-l from-[#F7B500] via-[#F7B500] to-transparent transition-all duration-1000 ease-out ${
          isLoaded ? "w-full" : "w-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      ></div>
    </div>
  )
}
