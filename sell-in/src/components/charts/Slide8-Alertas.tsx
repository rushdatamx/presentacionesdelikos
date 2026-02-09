"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, ChevronRight } from "lucide-react"

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  red: "#C0392B",
  redLight: "#FDEDEC",
}

const alertas = [
  {
    titulo: "MERCO: Alta concentración",
    descripcion: "63% de las ventas concentrado en Tostada Roja 70pz",
    riesgo: "Alto",
    detalle: "Riesgo de desabasto o cambio de preferencias del consumidor"
  },
  {
    titulo: "HEB: Baja rotación",
    descripcion: "SKUs con rotación menor al 50%",
    riesgo: "Medio",
    detalle: "Oportunidad de optimizar inventario y surtido"
  },
  {
    titulo: "FUTURAMA: Sin visibilidad",
    descripcion: "Sin datos de sell-out disponibles",
    riesgo: "Medio",
    detalle: "Necesario implementar tracking de sell-out"
  },
]

export default function Slide8Alertas() {
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
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-red-50 to-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-8 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
          <AlertTriangle className="w-7 h-7 text-red-600 animate-pulse" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Alertas
          </h1>
          <p className="text-lg text-gray-500 mt-1">Riesgos identificados que requieren atención</p>
        </div>
      </div>

      {/* Alerts Grid - animated */}
      <div className="flex-1 flex flex-col gap-6">
        {alertas.map((alerta, index) => {
          const isActive = activeIndex === index
          const isDimmed = selectedIndex !== null && selectedIndex !== index

          return (
            <div
              key={index}
              className={`flex items-center gap-6 bg-white rounded-2xl p-8 border cursor-pointer transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              } ${
                isActive
                  ? "border-red-300 shadow-xl scale-[1.02]"
                  : isDimmed
                  ? "opacity-40 border-red-100"
                  : "border-red-100 hover:shadow-lg hover:border-red-200"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isActive ? "scale-110 shadow-md" : ""
              }`}>
                <AlertTriangle className={`w-8 h-8 text-red-500 ${isActive ? "animate-bounce" : ""}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-[#1A1A1A] mb-1 transition-all duration-300 ${
                  isActive ? "scale-105 origin-left" : ""
                }`}>{alerta.titulo}</h3>
                <p className="text-gray-500">{alerta.descripcion}</p>
                {/* Expanded detail on active */}
                {isActive && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">
                    {alerta.detalle}
                  </p>
                )}
              </div>

              {/* Risk Badge */}
              <div
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  alerta.riesgo === "Alto"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                } ${isActive ? "scale-110" : ""}`}
              >
                Riesgo {alerta.riesgo}
                {isActive && <ChevronRight size={14} className="animate-pulse" />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Insight Box - animated */}
      <div
        className={`mt-6 p-6 bg-red-100 rounded-2xl border border-red-200 transition-all duration-700 hover:shadow-lg cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 animate-pulse" />
          <p className="text-red-800 font-medium text-lg">
            La dependencia de un solo producto en MERCO es el principal riesgo.
          </p>
        </div>
      </div>
    </div>
  )
}
