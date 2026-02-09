"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from "recharts"
import { TrendingUp, Sparkles } from "lucide-react"

const data = [
  { year: "2023", value: 7.6, color: "#6B7280" },
  { year: "2024", value: 12.7, color: "#9CA3AF" },
  { year: "2025", value: 18.5, color: "#F7B500" },
]

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  gray: "#6B7280",
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

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const prevYear = data.year === "2024" ? "2023" : data.year === "2025" ? "2024" : null
    const prevValue = data.year === "2024" ? 7.6 : data.year === "2025" ? 12.7 : null
    const growth = prevValue ? ((data.value - prevValue) / prevValue * 100).toFixed(0) : null

    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 min-w-[180px]">
        <p className="font-bold text-lg text-gray-900 mb-2">{data.year}</p>
        <p className="text-2xl font-bold" style={{ color: data.color }}>
          ${data.value}M
        </p>
        {growth && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={14} />
            +{growth}% vs {prevYear}
          </p>
        )}
      </div>
    )
  }
  return null
}

export default function Slide2RelacionComercial() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Animaciones count-up
  const count2023 = useCountUp(7.6, 1500, isLoaded)
  const count2024 = useCountUp(12.7, 1800, isLoaded)
  const count2025 = useCountUp(18.5, 2000, isLoaded)
  const countGrowth = useCountUp(143, 2200, isLoaded)
  const counts = [count2023, count2024, count2025]

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const activeIndex = selectedIndex !== null ? selectedIndex : hoveredIndex

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Nuestra Relacion Comercial
        </h1>
        <p className="text-lg text-gray-500 mt-2">Crecimiento Sostenido</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-12">
        {/* Left - Big Numbers */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Year cards - animated */}
          <div className="flex gap-6 mb-8">
            {data.map((item, index) => (
              <div
                key={item.year}
                className={`flex-1 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  activeIndex === index
                    ? "border-[#F7B500] bg-amber-50 scale-105 shadow-lg"
                    : selectedIndex !== null && selectedIndex !== index
                    ? "border-gray-200 bg-gray-50 opacity-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(index)}
              >
                <p className="text-sm font-medium text-gray-500 mb-2">{item.year}</p>
                <p
                  className="text-4xl font-bold transition-all duration-300"
                  style={{
                    color: item.year === "2025" ? COLORS.gold : COLORS.dark,
                    transform: activeIndex === index ? "scale(1.1)" : "scale(1)"
                  }}
                >
                  ${counts[index].toFixed(1)}M
                </p>
                {index < data.length - 1 && (
                  <p className="text-xs text-gray-400 mt-2">
                    +{((data[index + 1].value - item.value) / item.value * 100).toFixed(0)}% vs siguiente
                  </p>
                )}
                {item.year === "2025" && (
                  <div className="mt-2 flex items-center gap-1 text-amber-600">
                    <Sparkles size={14} />
                    <span className="text-xs font-medium">Ano record</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Growth indicator - animated */}
          <div
            className={`flex items-center justify-center gap-4 p-5 bg-[#1A1A1A] rounded-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <TrendingUp size={32} className="text-[#F7B500] animate-bounce-subtle" />
            <div>
              <span className="text-3xl font-bold text-[#F7B500]">+{Math.round(countGrowth)}%</span>
              <span className="text-lg text-gray-300 ml-3">crecimiento en 2 anos</span>
            </div>
          </div>

          {/* 2024 vs 2025 highlight - animated */}
          <div
            className={`mt-6 flex items-center justify-center gap-3 px-6 py-3 bg-amber-50 rounded-xl border border-amber-200 transition-all duration-700 hover:bg-amber-100 hover:border-amber-300 cursor-pointer ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <span className="text-amber-800 font-medium">2024 → 2025:</span>
            <span className="text-amber-900 font-bold text-xl">+45%</span>
            <span className="text-amber-700">(+$5.8M)</span>
          </div>
        </div>

        {/* Right - Bar Chart - animated */}
        <div
          className={`w-[450px] flex flex-col justify-center transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 16, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(247, 181, 0, 0.1)" }} />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(_, index) => handleClick(index)}
                animationDuration={1500}
                animationBegin={500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: activeIndex !== null && activeIndex !== index ? "opacity(0.4)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value: any) => `$${value}M`}
                  style={{ fill: "#1A1A1A", fontSize: 14, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend - clickable */}
          <div className="flex justify-center gap-6 mt-4">
            {data.map((item, index) => (
              <button
                key={item.year}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gray-100 scale-110"
                    : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(index)}
              >
                <div
                  className="w-4 h-4 rounded transition-transform duration-300"
                  style={{
                    backgroundColor: item.color,
                    transform: activeIndex === index ? "scale(1.2)" : "scale(1)"
                  }}
                />
                <span className={`text-sm transition-all duration-300 ${
                  activeIndex === index ? "font-bold text-gray-900" : "text-gray-600"
                }`}>
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          En 2025 facturamos $18.5 millones, un crecimiento del 45% vs 2024.
        </p>
      </div>
    </div>
  )
}
