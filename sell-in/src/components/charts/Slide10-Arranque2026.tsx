"use client"

import { useState, useEffect } from "react"
import { Rocket, TrendingUp, Sparkles } from "lucide-react"

const data = [
  { cliente: "FUTURAMA", valor: 4.2, color: "#F7B500", textColor: "#1A1A1A", porcentaje: 60 },
  { cliente: "MERCO", valor: 2.2, color: "#1A1A1A", textColor: "#FFFFFF", porcentaje: 31 },
  { cliente: "HEB", valor: 0.7, color: "#9CA3AF", textColor: "#1A1A1A", porcentaje: 10 },
]

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  gray: "#9CA3AF",
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

export default function Slide10Arranque2026() {
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

  const totalAnimated = useCountUp(7.0, 2000, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-4 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="p-3 bg-amber-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
          <Rocket size={24} className="text-amber-700" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Arranque 2026
          </h1>
          <p className="text-lg text-gray-500 mt-1">Resultados Enero 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center gap-12">
        {/* Big Number - animated */}
        <div
          className={`flex flex-col items-center justify-center w-[350px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span
            className="text-[120px] font-bold leading-none transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ color: COLORS.gold }}
          >
            ${totalAnimated.toFixed(1)}M
          </span>
          <span className="text-2xl text-gray-500 mt-2">Enero 2026</span>
          <div className="mt-4 px-6 py-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 hover:shadow-md transition-all cursor-pointer">
            <Sparkles size={16} className="text-amber-600" />
            <span className="text-sm text-amber-800 font-medium">
              En linea con el ritmo de crecimiento de 2025
            </span>
          </div>
        </div>

        {/* Breakdown - animated bars */}
        <div
          className={`flex-1 flex flex-col gap-4 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {data.map((item, index) => {
            const isActive = activeIndex === index
            const isDimmed = selectedIndex !== null && selectedIndex !== index

            return (
              <div
                key={item.cliente}
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive ? "bg-amber-50 scale-[1.02] shadow-md" : isDimmed ? "opacity-40" : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(index)}
              >
                {/* Cliente Label */}
                <div className="w-28">
                  <span className={`font-semibold text-[#1A1A1A] text-xl transition-all duration-300 ${
                    isActive ? "font-bold" : ""
                  }`}>
                    {item.cliente}
                  </span>
                </div>

                {/* Bar - animated */}
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className="h-12 rounded-xl flex items-center justify-end pr-5 transition-all duration-700"
                    style={{
                      width: isLoaded ? `${(item.valor / 4.5) * 100}%` : "0%",
                      backgroundColor: item.color,
                      minWidth: '80px',
                      transform: isActive ? "scaleY(1.15)" : "scaleY(1)",
                      transitionDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    <span className={`text-lg font-bold transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`} style={{ color: item.textColor }}>
                      ${item.valor}M
                    </span>
                  </div>
                </div>

                {/* Percentage */}
                <div className="w-16 text-right">
                  <span className={`text-lg font-bold transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  }`} style={{ color: item.color === "#F7B500" ? "#1A1A1A" : item.color }}>
                    {item.porcentaje}%
                  </span>
                </div>
              </div>
            )
          })}

          {/* Total Bar - animated */}
          <div
            className={`mt-3 pt-4 border-t-2 border-gray-200 transition-all duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="flex items-center gap-4 p-3">
              <div className="w-28">
                <span className="text-xl font-bold text-[#1A1A1A]">TOTAL</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-12 rounded-xl flex items-center justify-end pr-5 overflow-hidden transition-all duration-1000"
                  style={{
                    width: isLoaded ? '100%' : '0%',
                    background: `linear-gradient(to right, ${COLORS.gold} 60%, ${COLORS.dark} 60% 91%, ${COLORS.gray} 91%)`,
                    transitionDelay: "700ms",
                  }}
                >
                  <span className="text-lg font-bold text-white">$7.0M</span>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-lg font-bold text-[#1A1A1A]">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen por cliente - animated */}
        <div
          className={`w-[220px] flex flex-col gap-3 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="text-sm font-semibold text-gray-500 mb-2">Desglose Enero 2026</div>
          {data.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <div
                key={`summary-${item.cliente}`}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive ? "scale-[1.03] shadow-md" : "hover:shadow-sm"
                }`}
                style={{ backgroundColor: `${item.color}15`, borderLeft: `4px solid ${item.color}` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(index)}
              >
                <div>
                  <div className="text-sm font-medium text-gray-600">{item.cliente}</div>
                  <div className={`text-xl font-bold transition-all duration-300 ${
                    isActive ? "scale-105 origin-left" : ""
                  }`} style={{ color: item.color === "#F7B500" ? "#1A1A1A" : item.color }}>
                    ${item.valor}M
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold text-[#1A1A1A] transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}>{item.porcentaje}%</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Key insight - animated */}
      <div
        className={`flex justify-center mt-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <div className="flex items-center gap-6 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.gold }}></div>
            <span className="text-gray-700 font-medium">FUTURAMA lidera con 60%</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.dark }}></div>
            <span className="text-gray-700 font-medium">MERCO 31%</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.gray }}></div>
            <span className="text-gray-700 font-medium">HEB 10%</span>
          </div>
        </div>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Enero cerro en linea con el ritmo de crecimiento de 2025.
        </p>
      </div>
    </div>
  )
}
