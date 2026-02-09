"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine, Tooltip } from "recharts"
import { TrendingUp, Target, CheckCircle, ArrowRight } from "lucide-react"

const data = [
  { tienda: "MT MTY ANZURES", ventaActual: 88034, gap: 88236, porcentajePromedio: 50 },
  { tienda: "MT MTY AZTLAN", ventaActual: 102689, gap: 73581, porcentajePromedio: 58 },
  { tienda: "MT SAL SATELITE", ventaActual: 117512, gap: 58758, porcentajePromedio: 67 },
  { tienda: "MT MTY METROPLEX", ventaActual: 118791, gap: 57479, porcentajePromedio: 67 },
  { tienda: "MT SAL FUNDADORES", ventaActual: 120877, gap: 55393, porcentajePromedio: 69 },
]

const PROMEDIO = 176270

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 min-w-[220px]">
        <p className="font-bold text-gray-900 mb-2">{d.tienda.replace("MT ", "")}</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Venta actual:</span>
            <span className="font-bold text-[#6B7280]">${(d.ventaActual / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Gap vs promedio:</span>
            <span className="font-bold text-[#E31837]">${(d.gap / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">% del promedio:</span>
            <span className="font-bold text-[#F7B500]">{d.porcentajePromedio}%</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function Slide5TiendasPotencial() {
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
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#F7B500]/10 rounded-xl">
            <TrendingUp size={24} className="text-[#F7B500]" />
          </div>
          <span className="text-sm font-semibold text-[#F7B500] uppercase tracking-wider">Oportunidad #2</span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Tiendas con Espacio para Crecer
        </h1>
      </div>

      {/* KPIs Row */}
      <div
        className={`flex gap-6 mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="flex-1 p-5 bg-gradient-to-r from-[#F7B500]/10 to-amber-50 rounded-2xl border border-[#F7B500]/20">
          <span className="text-sm text-gray-600">Oportunidad si llegan al promedio</span>
          <span className="block text-4xl font-bold text-[#F7B500]">$509,347</span>
        </div>
        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
          <span className="text-sm text-gray-600">Venta promedio por tienda</span>
          <span className="block text-4xl font-bold text-[#1A1A1A]">$176,270</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-8">
        {/* Table */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-600">
              <span>Tienda</span>
              <span className="text-right">Venta Actual</span>
              <span className="text-right">Gap vs Promedio</span>
              <span className="text-right">% del Promedio</span>
            </div>

            {data.map((item, index) => {
              const isActive = activeIndex === index
              const isDimmed = selectedIndex !== null && selectedIndex !== index

              return (
                <div
                  key={item.tienda}
                  className={`grid grid-cols-4 gap-4 p-4 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    isActive ? "bg-[#F7B500]/10 scale-[1.01]" : isDimmed ? "opacity-40" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleClick(index)}
                >
                  <span className={`font-medium text-sm transition-all duration-300 ${
                    isActive ? "font-bold text-[#F7B500]" : "text-gray-800"
                  }`}>
                    {item.tienda.replace("MT ", "")}
                  </span>
                  <span className={`text-right font-bold text-sm transition-all duration-300 ${
                    isActive ? "scale-105" : ""
                  }`} style={{ color: "#6B7280" }}>
                    ${(item.ventaActual / 1000).toFixed(0)}K
                  </span>
                  <span className={`text-right font-bold text-sm transition-all duration-300 ${
                    isActive ? "scale-105 text-[#E31837]" : "text-[#E31837]"
                  }`}>
                    ${(item.gap / 1000).toFixed(0)}K
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F7B500] rounded-full transition-all duration-700"
                        style={{
                          width: isLoaded ? `${item.porcentajePromedio}%` : "0%",
                          transitionDelay: `${400 + index * 100}ms`
                        }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-10 text-right transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`} style={{ color: item.porcentajePromedio < 60 ? "#E31837" : "#F7B500" }}>
                      {item.porcentajePromedio}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chart */}
        <div
          className={`w-[420px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <XAxis type="number" domain={[0, 200000]} hide />
              <YAxis
                type="category"
                dataKey="tienda"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 10 }}
                tickFormatter={(value) => value.replace("MT ", "").substring(0, 12)}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(247, 181, 0, 0.1)" }} />
              <ReferenceLine x={PROMEDIO} stroke="#1A1A1A" strokeWidth={2} strokeDasharray="5 5" />
              <Bar
                dataKey="ventaActual"
                stackId="a"
                fill="#6B7280"
                radius={[0, 0, 0, 0]}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(_, index) => handleClick(index)}
                animationDuration={1500}
                animationBegin={500}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-actual-${index}`}
                    style={{
                      filter: activeIndex !== null && activeIndex !== index ? "opacity(0.3)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="gap"
                stackId="a"
                fill="#E31837"
                radius={[0, 4, 4, 0]}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(_, index) => handleClick(index)}
                animationDuration={1500}
                animationBegin={800}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-gap-${index}`}
                    style={{
                      filter: activeIndex !== null && activeIndex !== index ? "opacity(0.3)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#6B7280]" />
              <span className="text-sm text-gray-600">Venta actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#E31837]" />
              <span className="text-sm text-gray-600">Gap vs promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[#1A1A1A]" style={{ borderStyle: "dashed" }} />
              <span className="text-sm text-gray-600">Promedio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div
        className={`mt-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 transition-all duration-700 hover:shadow-lg cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0" />
          <p className="text-green-800 font-medium flex-1">
            <span className="font-bold">Acción propuesta:</span> Plan de activación conjunto: revisar exhibición, espacio en anaquel y promociones en estas 5 tiendas
          </p>
          <ArrowRight className="text-green-600" />
        </div>
      </div>
    </div>
  )
}
