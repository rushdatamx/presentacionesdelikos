"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from "recharts"
import { Star, TrendingUp, Sparkles } from "lucide-react"

const data = [
  { tienda: "MT REY BUGAMBILIAS", venta: 337829, porcentaje: 7.4, vsPromedio: 91.7 },
  { tienda: "MT MAT LAS BRISAS", venta: 310054, porcentaje: 6.8, vsPromedio: 75.9 },
  { tienda: "MT REY PERIFERICO", venta: 271671, porcentaje: 5.9, vsPromedio: 54.1 },
  { tienda: "MT MTY ZUAZUA", venta: 270561, porcentaje: 5.9, vsPromedio: 53.5 },
  { tienda: "MT REY SAN FERNANDO", venta: 247405, porcentaje: 5.4, vsPromedio: 40.4 },
]

const COLORS = ["#E31837", "#F7B500", "#1A1A1A", "#6B7280", "#9CA3AF"]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 min-w-[200px]">
        <p className="font-bold text-gray-900 mb-2">{d.tienda}</p>
        <p className="text-2xl font-bold text-[#E31837]">${(d.venta / 1000).toFixed(0)}K</p>
        <div className="flex items-center gap-2 mt-2 text-green-600">
          <TrendingUp size={14} />
          <span className="font-medium">+{d.vsPromedio}% vs promedio</span>
        </div>
      </div>
    )
  }
  return null
}

export default function Slide3TopTiendas() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const activeIndex = selectedIndex !== null ? selectedIndex : hoveredIndex

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 flex justify-between items-start transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight flex items-center gap-3">
            <Star className="text-[#F7B500]" />
            Nuestras Tiendas Estrella
          </h1>
          <p className="text-lg text-gray-500 mt-2">Top 5 performers del período</p>
        </div>

        {/* KPI Badge */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#E31837]/10 to-[#F7B500]/10 rounded-2xl border border-[#E31837]/20">
          <span className="text-sm text-gray-600">Top 5 = </span>
          <span className="text-2xl font-bold text-[#E31837]">31.4%</span>
          <span className="text-sm text-gray-600"> de la venta total</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-8">
        {/* Table */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-600">
              <span>Tienda</span>
              <span className="text-right">Venta 6 meses</span>
              <span className="text-right">% del Total</span>
              <span className="text-right">vs Promedio</span>
            </div>

            {/* Rows */}
            {data.map((item, index) => {
              const isActive = activeIndex === index
              const isDimmed = selectedIndex !== null && selectedIndex !== index

              return (
                <div
                  key={item.tienda}
                  className={`grid grid-cols-4 gap-4 p-4 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    isActive ? "bg-[#E31837]/5 scale-[1.01]" : isDimmed ? "opacity-40" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleClick(index)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                      style={{ backgroundColor: COLORS[index] }}
                    >
                      {index + 1}
                    </div>
                    <span className={`font-medium text-gray-800 text-sm transition-all duration-300 ${
                      isActive ? "font-bold" : ""
                    }`}>
                      {item.tienda.replace("MT ", "")}
                    </span>
                  </div>
                  <span className={`text-right font-bold transition-all duration-300 ${
                    isActive ? "text-[#E31837] scale-105" : "text-gray-900"
                  }`}>
                    ${(item.venta / 1000).toFixed(0)}K
                  </span>
                  <span className="text-right font-medium text-gray-600">
                    {item.porcentaje}%
                  </span>
                  <span className={`text-right font-bold transition-all duration-300 ${
                    isActive ? "scale-105" : ""
                  }`} style={{ color: "#27AE60" }}>
                    +{item.vsPromedio}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chart */}
        <div
          className={`w-[450px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 80, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="tienda"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 11 }}
                tickFormatter={(value) => value.replace("MT ", "")}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(227, 24, 55, 0.1)" }} />
              <Bar
                dataKey="venta"
                radius={[0, 8, 8, 0]}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(_, index) => handleClick(index)}
                animationDuration={1500}
                animationBegin={500}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    style={{
                      filter: activeIndex !== null && activeIndex !== index ? "opacity(0.3)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
                <LabelList
                  dataKey="venta"
                  position="right"
                  formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
                  style={{ fill: "#1A1A1A", fontSize: 12, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight */}
      <div
        className={`mt-4 p-5 bg-gradient-to-r from-[#F7B500]/10 to-[#E31837]/10 rounded-2xl border border-[#F7B500]/30 transition-all duration-700 hover:shadow-lg cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="text-[#F7B500] flex-shrink-0" />
          <p className="text-gray-800 font-medium">
            <span className="font-bold">Estas tiendas tienen en común:</span> alta rotación de Duritos y presencia completa del portafolio
          </p>
        </div>
      </div>
    </div>
  )
}
