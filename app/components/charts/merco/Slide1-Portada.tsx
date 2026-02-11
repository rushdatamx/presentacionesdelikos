"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Slide1Portada() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col relative overflow-hidden">
      {/* Background accent - animated */}
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] transition-opacity duration-1000 ${
          isLoaded ? "opacity-20" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle at top right, #F7B500 0%, transparent 70%)"
        }}
      />

      {/* Gold accent line - animated width */}
      <div
        className={`absolute top-0 left-0 h-2 bg-[#F7B500] transition-all duration-1000 ease-out ${
          isLoaded ? "w-full" : "w-0"
        }`}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Logos - animated */}
        <div
          className={`mb-8 flex items-center gap-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Image
            src="/images/delikos-logo-nuevo.jpeg"
            alt="Botanas Delikos"
            width={200}
            height={100}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
          <span className="text-4xl font-bold text-[#F7B500]">+</span>
          <Image
            src="/images/merco-logo.jpg"
            alt="MERCO"
            width={200}
            height={100}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title - animated */}
        <h1
          className={`text-5xl font-bold text-[#1A1A1A] tracking-tight mb-2 transition-all duration-700 ${
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
          className={`text-2xl text-gray-600 font-light tracking-wide transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          Revision de Negocio 2025
        </h2>

        {/* Date - animated */}
        <div
          className={`mt-12 px-6 py-2 bg-[#F7B500] rounded-full transition-all duration-700 hover:bg-[#F7B500]/90 hover:shadow-lg cursor-pointer ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="text-sm text-[#1A1A1A] font-semibold">Febrero 2026</p>
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
