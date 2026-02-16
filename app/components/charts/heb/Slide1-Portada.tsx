"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { TrendingUp, Calendar } from "lucide-react"

export default function Slide1Portada() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] p-12 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31837]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B500]/10 rounded-full blur-3xl" />

      {/* Top section with logos */}
      <div
        className={`flex justify-between items-start transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        {/* DELIKOS Logo */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
            <Image
              src="/images/delikos-logo-nuevo.jpeg"
              alt="DELIKOS"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">DELIKOS</span>
            <span className="block text-sm text-gray-400">Análisis PDQ 340gr y 45gr</span>
          </div>
        </div>

        {/* MI TIENDA Logo */}
        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-bold text-white text-right block">MI TIENDA</span>
            <span className="block text-sm text-gray-400 text-right">Del Ahorro</span>
          </div>
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer overflow-hidden">
            <Image
              src="/images/mitienda-logo.jpeg"
              alt="Mi Tienda"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`text-center transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp size={32} className="text-[#F7B500] animate-bounce-subtle" />
            <span className="text-lg font-medium text-[#F7B500] tracking-widest uppercase">
              Análisis de Oportunidades
            </span>
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Oportunidades de Crecimiento
          </h1>
          <h2 className="text-5xl font-bold mb-8">
            <span className="text-[#F7B500]">DELIKOS</span>
            <span className="text-white"> en </span>
            <span className="text-[#E31837]">MI TIENDA</span>
          </h2>

          <div
            className={`inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-700 hover:bg-white/20 cursor-pointer ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Calendar size={20} className="text-[#F7B500]" />
            <span className="text-xl text-white font-medium">
              Análisis Sell-Out PDQ | Periodo 2024-12 a 2026-04
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div
        className={`flex justify-between items-end transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-sm">Datos: Portal Mi Tienda</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-1 w-16 bg-[#F7B500] rounded-full" />
          <div className="h-1 w-8 bg-[#E31837] rounded-full" />
          <div className="h-1 w-4 bg-white/30 rounded-full" />
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold text-white">Periodo 2026-04</span>
        </div>
      </div>
    </div>
  )
}
