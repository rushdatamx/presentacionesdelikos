"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"
import { Sparkles } from "lucide-react"

const data = [
  { name: "Tostadas", value: 19.5, color: "#F7B500", monto: 12.7 },
  { name: "Curado", value: 18.4, color: "#1A1A1A", monto: 12.0 },
  { name: "Domo Premium", value: 13.3, color: "#9CA3AF", monto: 8.7 },
  { name: "Harinas", value: 13.1, color: "#D4D4D4", monto: 8.5 },
  { name: "Papa", value: 11.2, color: "#E5E5E5", monto: 7.3 },
  { name: "Otros", value: 24.5, color: "#F5F5F5", monto: 15.9 },
]

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 8}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#fff"
        strokeWidth={4}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
      />
    </g>
  )
}

export default function Slide5MixCategoria() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const currentActive = selectedIndex !== null ? selectedIndex : activeIndex
  const activeData = currentActive !== null ? data[currentActive] : null

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Mix por Categoria
        </h1>
        <p className="text-lg text-gray-500 mt-2">Distribucion de ventas 2025</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center gap-12">
        {/* Donut Chart - animated */}
        <div
          className={`relative w-[380px] h-[380px] transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={170}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={(_, index) => handleClick(index)}
                activeShape={currentActive !== null ? renderActiveShape : undefined}
                animationDuration={1000}
                animationBegin={400}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: selectedIndex !== null && selectedIndex !== index ? "opacity(0.3)" : currentActive !== null && currentActive !== index ? "opacity(0.5)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text - Dynamic with animation */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {activeData ? (
              <div className="animate-fade-in text-center">
                <span className="text-4xl font-bold" style={{ color: activeData.color === "#F5F5F5" ? "#1A1A1A" : activeData.color }}>
                  {activeData.value}%
                </span>
                <span className="block text-lg font-semibold text-[#1A1A1A]">{activeData.name}</span>
                <span className="block text-sm text-gray-500">${activeData.monto}M</span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-4xl font-bold text-[#1A1A1A]">$65.1M</span>
                <span className="block text-sm text-gray-500">Total 2025</span>
              </div>
            )}
          </div>
        </div>

        {/* Legend con datos completos - animated */}
        <div
          className={`flex flex-col gap-3 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                currentActive === index ? "bg-gray-100 scale-[1.03] shadow-md" : "hover:bg-gray-50"
              } ${selectedIndex !== null && selectedIndex !== index ? "opacity-40" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => handleClick(index)}
            >
              {/* Color indicator */}
              <div
                className={`w-4 h-4 rounded transition-transform duration-300 ${
                  currentActive === index ? "scale-125" : ""
                }`}
                style={{ backgroundColor: item.color, border: item.color === "#F5F5F5" ? "1px solid #E5E5E5" : "none" }}
              ></div>

              {/* Name */}
              <span className={`text-base text-[#1A1A1A] font-medium w-28 transition-all duration-300 ${
                currentActive === index ? "font-bold" : ""
              }`}>{item.name}</span>

              {/* Progress bar - animated */}
              <div className="w-28 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: isLoaded ? `${item.value * 4}%` : "0%",
                    backgroundColor: item.color === "#F5F5F5" ? "#D4D4D4" : item.color,
                    transitionDelay: `${500 + index * 80}ms`,
                    transform: currentActive === index ? "scaleY(1.3)" : "scaleY(1)",
                  }}
                ></div>
              </div>

              {/* Percentage */}
              <span className={`text-base font-bold w-14 text-right transition-all duration-300 ${
                currentActive === index ? "scale-110" : ""
              }`} style={{ color: index < 2 ? "#1A1A1A" : "#6B7280" }}>
                {item.value}%
              </span>

              {/* Money amount */}
              <span className={`text-base font-semibold w-20 text-right transition-all duration-300 ${
                currentActive === index ? "scale-110" : ""
              }`} style={{ color: index < 2 ? "#F7B500" : "#9CA3AF" }}>
                ${item.monto}M
              </span>
            </div>
          ))}

          {/* Total row */}
          <div className="flex items-center gap-3 p-3 mt-2 border-t-2 border-gray-200">
            <div className="w-4 h-4"></div>
            <span className="text-base text-[#1A1A1A] font-bold w-28">TOTAL</span>
            <div className="w-28"></div>
            <span className="text-base font-bold w-14 text-right">100%</span>
            <span className="text-base font-bold w-20 text-right text-[#1A1A1A]">$65.1M</span>
          </div>
        </div>
      </div>

      {/* Key insight - animated */}
      <div
        className={`flex justify-center mt-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-4 px-6 py-3 bg-amber-50 rounded-xl border border-amber-200 hover:shadow-md transition-all cursor-pointer hover:scale-102">
          <Sparkles size={16} className="text-amber-600" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#F7B500" }}></div>
            <span className="text-amber-800 font-medium">Tostadas</span>
          </div>
          <span className="text-amber-700">+</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#1A1A1A" }}></div>
            <span className="text-amber-800 font-medium">Curado</span>
          </div>
          <span className="text-amber-700">=</span>
          <span className="text-amber-800 font-bold">37.9% de ventas ($24.7M)</span>
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
          Tostadas y Curado representan casi 40% de las ventas.
        </p>
      </div>
    </div>
  )
}
