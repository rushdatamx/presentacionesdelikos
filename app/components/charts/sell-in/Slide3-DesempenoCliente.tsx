"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Star } from "lucide-react"

const data = [
  { cliente: "FUTURAMA", v2024: 15.9, v2025: 38.8, crecimiento: "+144%", incremento: 22.9 },
  { cliente: "MERCO", v2024: 12.7, v2025: 18.5, crecimiento: "+45%", incremento: 5.8 },
  { cliente: "HEB", v2024: 1.6, v2025: 7.9, crecimiento: "+381%", incremento: 6.3 },
]

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  white: "#FFFFFF",
  gray: "#6B7280",
  green: "#27AE60",
}

export default function Slide3DesempenoCliente() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (cliente: string) => {
    setSelectedClient(selectedClient === cliente ? null : cliente)
  }

  const activeClient = selectedClient !== null ? selectedClient : hoveredClient

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Desempeno por Cliente
        </h1>
        <p className="text-lg text-gray-500 mt-2">Comparativo 2024 vs 2025 (Millones MXN)</p>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex gap-8">
        {/* Bars Section */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          {data.map((item, index) => {
            const isActive = activeClient === item.cliente
            const isDimmed = activeClient !== null && activeClient !== item.cliente

            return (
              <div
                key={item.cliente}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                } ${
                  isActive
                    ? "bg-amber-50 scale-[1.02] shadow-lg"
                    : isDimmed
                    ? "opacity-40"
                    : "hover:bg-gray-50"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredClient(item.cliente)}
                onMouseLeave={() => setHoveredClient(null)}
                onClick={() => handleClick(item.cliente)}
              >
                {/* Cliente Label */}
                <div className="w-28 text-right flex items-center justify-end gap-2">
                  {item.cliente === "FUTURAMA" && isActive && (
                    <Star size={16} className="text-amber-500 animate-pulse" />
                  )}
                  {item.cliente === "HEB" && isActive && (
                    <Award size={16} className="text-green-500 animate-pulse" />
                  )}
                  <span className={`text-xl font-semibold text-[#1A1A1A] transition-all duration-300 ${
                    isActive ? "font-bold" : ""
                  }`}>
                    {item.cliente}
                  </span>
                </div>

                {/* Bars Container */}
                <div className="flex-1 flex flex-col gap-2">
                  {/* 2024 Bar */}
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 rounded-lg flex items-center justify-end pr-4 transition-all duration-700"
                      style={{
                        width: isLoaded ? `${(item.v2024 / 40) * 100}%` : "0%",
                        backgroundColor: COLORS.dark,
                        minWidth: '70px',
                        transform: isActive ? "scaleY(1.15)" : "scaleY(1)",
                        transitionDelay: `${400 + index * 100}ms`,
                      }}
                    >
                      <span className="text-white font-medium text-sm">${item.v2024}M</span>
                    </div>
                    <span className="text-sm text-gray-400 w-10">2024</span>
                  </div>

                  {/* 2025 Bar */}
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 rounded-lg flex items-center justify-end pr-4 transition-all duration-700"
                      style={{
                        width: isLoaded ? `${(item.v2025 / 40) * 100}%` : "0%",
                        backgroundColor: COLORS.gold,
                        minWidth: '70px',
                        transform: isActive ? "scaleY(1.15)" : "scaleY(1)",
                        transitionDelay: `${500 + index * 100}ms`,
                      }}
                    >
                      <span className="text-[#1A1A1A] font-semibold text-sm">${item.v2025}M</span>
                    </div>
                    <span className="text-sm text-gray-400 w-10">2025</span>
                  </div>
                </div>

                {/* Growth Badge */}
                <div className="w-20 flex justify-center">
                  <span
                    className={`px-3 py-2 rounded-full text-base font-bold transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? COLORS.dark : COLORS.gold,
                      color: isActive ? COLORS.gold : COLORS.dark
                    }}
                  >
                    {item.crecimiento}
                  </span>
                </div>

                {/* Incremento */}
                <div className="w-28 text-right">
                  <div className="text-xs text-gray-400">Incremento</div>
                  <div className={`text-lg font-bold transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  }`} style={{ color: COLORS.green }}>
                    +${item.incremento}M
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend - animated */}
      <div
        className={`flex items-center justify-center gap-8 mt-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.dark }}></div>
          <span className="text-sm text-gray-600">2024</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.gold }}></div>
          <span className="text-sm text-gray-600">2025</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.green }}></div>
          <span className="text-sm text-gray-600">Incremento</span>
        </div>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          FUTURAMA es el cliente mas grande. HEB tuvo el mayor crecimiento porcentual.
        </p>
      </div>
    </div>
  )
}
