"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Presentation, TrendingUp, Store, ChevronRight, ShoppingCart, Target } from "lucide-react"

const presentaciones = [
  {
    id: "mitienda",
    titulo: "MI TIENDA Oportunidades 2026",
    descripcion: "Análisis Sell-Out y oportunidades de crecimiento",
    slides: 7,
    color: "#E31837",
    icono: Target,
    logo: "/images/mitienda-logo.jpeg",
    highlights: ["$4.58M Ventas", "$929K Oportunidad", "Sell-Out Ago-Feb"]
  },
  {
    id: "merco",
    titulo: "MERCO Review 2025",
    descripcion: "Análisis de desempeño con cliente MERCO",
    slides: 6,
    color: "#F7B500",
    icono: Store,
    logo: "/images/merco-logo.jpg",
    highlights: ["Crecimiento 143%", "Top Productos", "Performance Tiendas"]
  },
  {
    id: "sell-in",
    titulo: "Sell-In 2025",
    descripcion: "Resultados generales de ventas 2025",
    slides: 9,
    color: "#1A1A1A",
    icono: TrendingUp,
    logo: "/images/delikos-logo-nuevo.jpeg",
    highlights: ["$65.1M Total", "Mix por Categoría", "Arranque 2026"]
  }
]

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            src="/images/delikos-logo-nuevo.jpeg"
            alt="DELIKOS"
            width={80}
            height={80}
            className="rounded-xl shadow-lg"
          />
        </div>
        <h1 className="text-5xl font-bold text-[#1A1A1A] tracking-tight mb-3">
          DELIKOS
        </h1>
        <p className="text-xl text-gray-500">Presentaciones Ejecutivas</p>
      </div>

      {/* Cards */}
      <div className="flex gap-6 max-w-6xl flex-wrap justify-center">
        {presentaciones.map((pres, index) => {
          const Icon = pres.icono
          const isHovered = hoveredId === pres.id

          return (
            <Link
              key={pres.id}
              href={`/${pres.id}`}
              className={`w-[340px] bg-white rounded-3xl border-2 p-6 cursor-pointer transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                isHovered
                  ? "border-[#F7B500] shadow-2xl scale-[1.02]"
                  : "border-gray-200 shadow-lg hover:shadow-xl"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredId(pres.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Logo */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 overflow-hidden ${
                  isHovered ? "scale-110" : ""
                }`}
                style={{ backgroundColor: pres.logo ? "#fff" : `${pres.color}15` }}
              >
                {pres.logo ? (
                  <Image
                    src={pres.logo}
                    alt={pres.titulo}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                ) : (
                  <Icon
                    size={32}
                    style={{ color: pres.color }}
                    className={isHovered ? "animate-bounce-subtle" : ""}
                  />
                )}
              </div>

              {/* Title */}
              <h2 className={`text-2xl font-bold text-[#1A1A1A] mb-2 transition-all duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}>
                {pres.titulo}
              </h2>
              <p className="text-gray-500 mb-6">{pres.descripcion}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pres.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      isHovered ? "scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: `${pres.color}15`,
                      color: pres.color === "#1A1A1A" ? "#1A1A1A" : pres.color,
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <Presentation size={16} />
                  <span className="text-sm">{pres.slides} slides</span>
                </div>
                <div
                  className={`flex items-center gap-1 font-medium transition-all duration-300 ${
                    isHovered ? "translate-x-2" : ""
                  }`}
                  style={{ color: pres.color === "#1A1A1A" ? "#F7B500" : pres.color }}
                >
                  <span>Ver presentación</span>
                  <ChevronRight size={18} className={isHovered ? "animate-pulse" : ""} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div
        className={`mt-12 text-center transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-sm text-gray-400">
          Powered by RushData • Presentaciones Interactivas
        </p>
      </div>
    </div>
  )
}
