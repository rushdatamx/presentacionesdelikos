"use client"

import { useState, useEffect } from "react"
import { CheckCircle, TrendingUp, ArrowRight, Target } from "lucide-react"

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  green: "#27AE60",
  greenLight: "#E8F8F0",
}

const oportunidades = [
  {
    titulo: "MERCO: Aumentar pedidos",
    descripcion: "Sell-through de 119% indica demanda insatisfecha. Oportunidad de incrementar volumen.",
    impacto: "Alto",
    meta: "+$2M potencial",
    detalle: "La demanda supera la oferta, hay espacio para crecer"
  },
  {
    titulo: "MERCO: Diversificar portafolio",
    descripcion: "Introducir cacahuates y papas para reducir dependencia de Tostada Roja.",
    impacto: "Alto",
    meta: "Reducir concentración a 50%",
    detalle: "Protege ante cambios en preferencias del consumidor"
  },
  {
    titulo: "HEB: Expandir PDQs",
    descripcion: "El PDQ Papa 500g tiene buen desempeño. Expandir a más tiendas.",
    impacto: "Medio",
    meta: "+30 tiendas",
    detalle: "Modelo probado, listo para escalar"
  },
]

export default function Slide9Oportunidades() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const activeIndex = selectedIndex !== null ? selectedIndex : hoveredIndex

  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-green-50 to-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-8 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
          <TrendingUp className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Oportunidades
          </h1>
          <p className="text-lg text-gray-500 mt-1">Acciones de alto impacto para 2026</p>
        </div>
      </div>

      {/* Opportunities Grid - animated */}
      <div className="flex-1 flex flex-col gap-6">
        {oportunidades.map((oportunidad, index) => {
          const isActive = activeIndex === index
          const isDimmed = selectedIndex !== null && selectedIndex !== index

          return (
            <div
              key={index}
              className={`flex items-center gap-6 bg-white rounded-2xl p-8 border cursor-pointer transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              } ${
                isActive
                  ? "border-green-300 shadow-xl scale-[1.02]"
                  : isDimmed
                  ? "opacity-40 border-green-100"
                  : "border-green-100 hover:shadow-lg hover:border-green-200"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isActive ? "scale-110 shadow-md" : ""
              }`}>
                <CheckCircle className={`w-8 h-8 text-green-500 ${isActive ? "animate-bounce-subtle" : ""}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-[#1A1A1A] mb-1 transition-all duration-300 ${
                  isActive ? "scale-105 origin-left" : ""
                }`}>{oportunidad.titulo}</h3>
                <p className="text-gray-500">{oportunidad.descripcion}</p>
                {/* Expanded detail on active */}
                {isActive && (
                  <div className="mt-3 flex items-center gap-4 animate-fade-in">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                      <Target size={14} className="text-green-600" />
                      <span className="text-sm text-green-700 font-medium">{oportunidad.meta}</span>
                    </div>
                    <p className="text-sm text-green-600">{oportunidad.detalle}</p>
                  </div>
                )}
              </div>

              {/* Impact Badge */}
              <div
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  oportunidad.impacto === "Alto"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                } ${isActive ? "scale-110" : ""}`}
              >
                Impacto {oportunidad.impacto}
                {isActive && <ArrowRight size={14} className="animate-pulse" />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Insight Box - animated */}
      <div
        className={`mt-6 p-6 bg-green-100 rounded-2xl border border-green-200 transition-all duration-700 hover:shadow-lg cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-4">
          <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 animate-bounce-subtle" />
          <p className="text-green-800 font-medium text-lg">
            La mayor oportunidad es incrementar volumen en MERCO.
          </p>
        </div>
      </div>
    </div>
  )
}
