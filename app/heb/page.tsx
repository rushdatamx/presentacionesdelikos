"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"

// Import all HEB slides
import Slide1Portada from "../components/charts/heb/Slide1-Portada"
import Slide2ResumenEjecutivo from "../components/charts/heb/Slide2-ResumenEjecutivo"
import Slide3TopTiendas from "../components/charts/heb/Slide3-TopTiendas"
import Slide4QuiebresStock from "../components/charts/heb/Slide4-QuiebresStock"
import Slide5PDQ340 from "../components/charts/heb/Slide6-PDQ340"
import Slide6PDQ45 from "../components/charts/heb/Slide7-PDQ45"
import Slide7ProximosPasos from "../components/charts/heb/Slide8-ProximosPasos"

const slides = [
  { id: 1, name: "Portada", component: Slide1Portada },
  { id: 2, name: "Resumen Ejecutivo", component: Slide2ResumenEjecutivo },
  { id: 3, name: "Top 5 Tiendas", component: Slide3TopTiendas },
  { id: 4, name: "Quiebres de Stock", component: Slide4QuiebresStock },
  { id: 5, name: "PDQ 340gr", component: Slide5PDQ340 },
  { id: 6, name: "PDQ 45gr", component: Slide6PDQ45 },
  { id: 7, name: "Plan de Acción", component: Slide7ProximosPasos },
]

export default function HEBPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Navigation Bar */}
      <div className="w-[1280px] flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-gray-700"
        >
          <Home size={18} />
          <span className="font-medium">Inicio</span>
        </Link>

        <div className="flex items-center gap-1 bg-white rounded-xl shadow-md px-2 py-1">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentSlide === index
                  ? "bg-[#E31837] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {slide.id}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-xl shadow-md">
          <span className="font-bold text-[#E31837]">{currentSlide + 1}</span>
          <span> / {slides.length}</span>
          <span className="ml-2 text-gray-400">|</span>
          <span className="ml-2">{slides[currentSlide].name}</span>
        </div>
      </div>

      {/* Slide Container */}
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <CurrentSlideComponent key={currentSlide} />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          className={`absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            currentSlide === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white shadow-lg hover:shadow-xl hover:scale-110 text-gray-700"
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          className={`absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            currentSlide === slides.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#E31837] shadow-lg hover:shadow-xl hover:scale-110 text-white"
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="mt-4 text-sm text-gray-400">
        Usa las flechas ← → o haz clic en los números para navegar
      </div>
    </div>
  )
}
