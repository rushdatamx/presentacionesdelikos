"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Sparkles } from "lucide-react"

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  green: "#27AE60",
}

// Hook para animacion count-up
const useCountUp = (end: number, duration = 2000, startAnimation = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.round(start * 10) / 10)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startAnimation])

  return count
}

export default function Slide2ResumenEjecutivo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const countGrowth = useCountUp(115, 2000, isLoaded)
  const count2024 = useCountUp(30.2, 1500, isLoaded)
  const count2025 = useCountUp(65.1, 2000, isLoaded)
  const countIncrement = useCountUp(34.9, 1800, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Resumen Ejecutivo
        </h1>
        <p className="text-lg text-gray-500 mt-2">Resultados 2025 vs 2024</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center gap-16">
        {/* Big Number - animated */}
        <div
          className={`flex flex-col items-center transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-12 h-12 animate-bounce-subtle" style={{ color: COLORS.green }} />
          </div>
          <span
            className="text-[180px] font-bold leading-none transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ color: COLORS.gold }}
          >
            +{Math.round(countGrowth)}%
          </span>
          <span className="text-3xl text-gray-500 mt-4">Crecimiento vs 2024</span>
        </div>

        {/* Comparison Cards - animated */}
        <div className="flex flex-col gap-6">
          {/* 2024 */}
          <div
            className={`flex items-center gap-8 p-8 bg-gray-50 rounded-2xl min-w-[400px] cursor-pointer transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            } ${
              hoveredYear === "2024"
                ? "scale-105 shadow-lg"
                : hoveredYear !== null
                ? "opacity-50"
                : "hover:shadow-md"
            }`}
            style={{ transitionDelay: "300ms" }}
            onMouseEnter={() => setHoveredYear("2024")}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase tracking-wide">2024</span>
              <span className="text-5xl font-bold text-[#1A1A1A]">${count2024.toFixed(1)}M</span>
            </div>
            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: isLoaded ? "46%" : "0%",
                  backgroundColor: COLORS.dark,
                  transitionDelay: "600ms"
                }}
              ></div>
            </div>
          </div>

          {/* 2025 */}
          <div
            className={`flex items-center gap-8 p-8 bg-amber-50 rounded-2xl min-w-[400px] border-2 border-amber-200 cursor-pointer transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            } ${
              hoveredYear === "2025"
                ? "scale-105 shadow-lg border-amber-400"
                : hoveredYear !== null
                ? "opacity-50"
                : "hover:shadow-md hover:border-amber-300"
            }`}
            style={{ transitionDelay: "400ms" }}
            onMouseEnter={() => setHoveredYear("2025")}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 uppercase tracking-wide">2025</span>
                {hoveredYear === "2025" && (
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                )}
              </div>
              <span className="text-5xl font-bold" style={{ color: COLORS.gold }}>
                ${count2025.toFixed(1)}M
              </span>
            </div>
            <div className="flex-1 h-4 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: isLoaded ? "100%" : "0%",
                  backgroundColor: COLORS.gold,
                  transitionDelay: "800ms"
                }}
              ></div>
            </div>
          </div>

          {/* Delta - animated */}
          <div
            className={`flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 transition-all duration-500 hover:scale-102 hover:shadow-md cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold">
              +${countIncrement.toFixed(1)}M de incremento
            </span>
          </div>
        </div>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          En 2025 más que duplicamos las ventas en nuestros 3 clientes principales, pasando de $30.2M a $65.1M.
        </p>
      </div>
    </div>
  )
}
