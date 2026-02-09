"use client"

import { useState, useEffect } from "react"
import { Store, TrendingUp, Award, MapPin, Sparkles } from "lucide-react"

const data = [
  { rank: 1, tienda: "MERCO Buenavista", ventas: 1.0, porcentaje: 4.6, ciudad: "Monterrey" },
  { rank: 2, tienda: "MERCO Los Pilares", ventas: 1.0, porcentaje: 4.5, ciudad: "Guadalupe" },
  { rank: 3, tienda: "MERCO Garcia", ventas: 0.946, porcentaje: 4.3, ciudad: "Garcia" },
  { rank: 4, tienda: "MERCO Girasoles", ventas: 0.940, porcentaje: 4.3, ciudad: "Apodaca" },
  { rank: 5, tienda: "MERCO Sendero Sta Catarina", ventas: 0.887, porcentaje: 4.0, ciudad: "Santa Catarina" },
  { rank: 6, tienda: "MERCO Solidaridad", ventas: 0.840, porcentaje: 3.8, ciudad: "Monterrey" },
  { rank: 7, tienda: "MERCO El Jaral", ventas: 0.808, porcentaje: 3.7, ciudad: "Juarez" },
  { rank: 8, tienda: "MERCO Paraje San Jose", ventas: 0.743, porcentaje: 3.4, ciudad: "Escobedo" },
  { rank: 9, tienda: "MERCO Santa Elena Zuazua", ventas: 0.728, porcentaje: 3.3, ciudad: "Zuazua" },
  { rank: 10, tienda: "MERCO Montemorelos", ventas: 0.715, porcentaje: 3.2, ciudad: "Montemorelos" },
]

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  gray: "#6B7280",
}

const maxVentas = 1.0

export default function Slide4PerformanceTiendas() {
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

  // Calculate totals for animated stats
  const totalTiendas = 43
  const top10Percentage = 39

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-4 flex justify-between items-start transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Performance por Tienda
          </h1>
          <p className="text-lg text-gray-500 mt-2">Top 10 Tiendas MERCO</p>
        </div>

        {/* Stats - animated with hover */}
        <div className="flex gap-4">
          <div
            className={`flex items-center gap-3 px-5 py-3 bg-[#1A1A1A] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Store size={24} className="text-[#F7B500]" />
            <div>
              <p className="text-2xl font-bold text-[#F7B500]">{totalTiendas}</p>
              <p className="text-xs text-gray-400">Tiendas activas</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-200 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-400 cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <TrendingUp size={24} className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{top10Percentage}%</p>
              <p className="text-xs text-amber-700">Top 10 del total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Horizontal bars with animations */}
      <div className="flex-1 flex flex-col gap-2">
        {data.map((item, index) => (
          <div
            key={item.rank}
            className={`flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            } ${
              activeIndex === index
                ? "bg-amber-50 scale-[1.02] shadow-md -mx-2 px-6"
                : selectedIndex !== null && selectedIndex !== index
                ? "opacity-40"
                : "hover:bg-gray-50"
            }`}
            style={{
              transitionDelay: `${100 + index * 50}ms`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
          >
            {/* Rank with animation */}
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                item.rank <= 3 ? "bg-[#F7B500] text-[#1A1A1A]" : "bg-gray-100 text-gray-600"
              } ${activeIndex === index ? "scale-125" : ""}`}
            >
              {item.rank === 1 && activeIndex === index ? (
                <Award size={14} />
              ) : (
                item.rank
              )}
            </span>

            {/* Store name with city tooltip on hover */}
            <div className="w-56 flex items-center gap-2">
              <span className={`text-sm font-medium text-[#1A1A1A] truncate transition-all duration-300 ${
                activeIndex === index ? "font-bold" : ""
              }`}>
                {item.tienda}
              </span>
              {activeIndex === index && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full animate-fade-in">
                  <MapPin size={10} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500">{item.ciudad}</span>
                </div>
              )}
            </div>

            {/* Bar - animated width */}
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                  style={{
                    width: isLoaded ? `${(item.ventas / maxVentas) * 100}%` : "0%",
                    backgroundColor: item.rank <= 3 ? COLORS.gold : COLORS.dark,
                    transitionDelay: `${400 + index * 80}ms`,
                    transform: activeIndex === index ? "scaleY(1.1)" : "scaleY(1)",
                  }}
                >
                  <span className={`text-xs font-bold transition-all duration-300 ${item.rank <= 3 ? "text-[#1A1A1A]" : "text-white"} ${
                    activeIndex === index ? "scale-110" : ""
                  }`}>
                    ${item.ventas >= 1 ? `${item.ventas.toFixed(1)}M` : `${(item.ventas * 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>
            </div>

            {/* Percentage with sparkle on top 3 */}
            <div className="w-16 flex items-center justify-end gap-1">
              {item.rank <= 3 && activeIndex === index && (
                <Sparkles size={12} className="text-amber-500 animate-pulse" />
              )}
              <span className={`text-sm font-bold transition-all duration-300 ${
                item.rank <= 3 ? "text-[#F7B500]" : "text-gray-600"
              } ${activeIndex === index ? "scale-110" : ""}`}>
                {item.porcentaje}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar - animated */}
      <div
        className={`mt-4 p-4 bg-gray-50 rounded-xl transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Distribucion de ventas en Top 10</span>
          <span className="text-sm text-gray-500">Representan el 39% del total</span>
        </div>
        <div className="flex h-8 rounded-lg overflow-hidden">
          {data.map((item, index) => (
            <div
              key={item.rank}
              className={`h-full flex items-center justify-center transition-all duration-500 cursor-pointer ${
                activeIndex === index ? "scale-y-125" : ""
              }`}
              style={{
                width: isLoaded ? `${(item.porcentaje / 39.1) * 100}%` : "0%",
                backgroundColor: index < 3 ? COLORS.gold : index < 6 ? COLORS.dark : COLORS.gray,
                opacity: selectedIndex !== null && selectedIndex !== index ? 0.3 : activeIndex !== null && activeIndex !== index ? 0.6 : 1,
                transitionDelay: `${900 + index * 50}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              <span className={`text-[10px] font-bold transition-all duration-300 ${
                index < 3 ? "text-[#1A1A1A]" : "text-white"
              } ${activeIndex === index ? "scale-125" : ""}`}>
                {item.rank}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Las top 10 tiendas representan el 39% del total. Distribucion balanceada.
        </p>
      </div>
    </div>
  )
}
