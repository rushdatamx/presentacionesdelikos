"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { LayoutGrid, AlertTriangle, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const distribucionCadena = [
  { name: "Fuego", value: 42.7, color: "#E31837", esperado: 33.3, diferencia: 9.4 },
  { name: "Sal", value: 28.7, color: "#F7B500", esperado: 33.3, diferencia: -4.6 },
  { name: "Jalapeño", value: 28.6, color: "#27AE60", esperado: 33.3, diferencia: -4.7 },
]

const tiendasSesgo = [
  { tienda: "MT REY SAN FERNANDO", sal: 10, fuego: 81, jalapeno: 9 },
  { tienda: "MT MTY LINCOLN", sal: 10, fuego: 73, jalapeno: 17 },
  { tienda: "MT MTY ANZURES", sal: 13, fuego: 73, jalapeno: 14 },
  { tienda: "MT MAT LAS BRISAS", sal: 10, fuego: 68, jalapeno: 21 },
  { tienda: "MT MTY ZUAZUA", sal: 16, fuego: 61, jalapeno: 23 },
  { tienda: "MT NVO REFORMA", sal: 21, fuego: 52, jalapeno: 27 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 min-w-[180px]">
        <p className="font-bold text-lg" style={{ color: d.color }}>{d.name}</p>
        <p className="text-2xl font-bold text-gray-900">{d.value}%</p>
        <p className="text-sm text-gray-500 mt-1">Esperado: {d.esperado}%</p>
        <p className={`text-sm font-bold mt-1 ${d.diferencia > 0 ? "text-[#E31837]" : "text-green-600"}`}>
          {d.diferencia > 0 ? "+" : ""}{d.diferencia.toFixed(1)}pp
        </p>
      </div>
    )
  }
  return null
}

export default function Slide6BalancePDQ() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredTienda, setHoveredTienda] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#6B7280]/10 rounded-xl">
            <LayoutGrid size={24} className="text-[#6B7280]" />
          </div>
          <span className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Oportunidad #3</span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Optimización del Exhibidor PDQ 340gr
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          El PDQ 340gr contiene 3 sabores que deberían venderse en proporción similar (33% cada uno)
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-8">
        {/* Left - Pie Chart */}
        <div
          className={`w-[400px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución actual a nivel cadena</h3>

          <div className="relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={distribucionCadena}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animationDuration={1500}
                  animationBegin={400}
                >
                  {distribucionCadena.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        filter: hoveredIndex !== null && hoveredIndex !== index ? "opacity(0.4)" : "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center"
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-2xl font-bold text-[#1A1A1A]">PDQ</span>
                <span className="block text-sm text-gray-500">340gr</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            {distribucionCadena.map((item, index) => {
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={item.name}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    isHovered ? "bg-gray-100 scale-[1.02]" : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <span className={`font-medium transition-all duration-300 ${isHovered ? "font-bold" : ""}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg" style={{ color: item.color }}>{item.value}%</span>
                    {item.diferencia > 5 && (
                      <span className="text-xs px-2 py-1 bg-[#E31837]/10 text-[#E31837] rounded-full font-medium flex items-center gap-1">
                        <AlertTriangle size={10} />
                        +{item.diferencia.toFixed(1)}pp
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right - Table */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-[#E31837]" />
            Tiendas con sesgo extremo en Fuego ({">"}50%)
          </h3>

          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-3 bg-gray-100 text-sm font-semibold text-gray-600">
              <span>Tienda</span>
              <span className="text-center">Sal</span>
              <span className="text-center">Fuego</span>
              <span className="text-center">Jalapeño</span>
            </div>

            {tiendasSesgo.map((item, index) => {
              const isHovered = hoveredTienda === index

              return (
                <div
                  key={item.tienda}
                  className={`grid grid-cols-4 gap-4 p-3 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    isHovered ? "bg-[#E31837]/5 scale-[1.01]" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHoveredTienda(index)}
                  onMouseLeave={() => setHoveredTienda(null)}
                >
                  <span className={`text-sm transition-all duration-300 ${
                    isHovered ? "font-bold" : "font-medium"
                  }`}>
                    {item.tienda.replace("MT ", "")}
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F7B500] rounded-full transition-all duration-700"
                        style={{ width: `${item.sal * 3}%`, transitionDelay: `${400 + index * 50}ms` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{item.sal}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E31837] rounded-full transition-all duration-700"
                        style={{ width: `${item.fuego}%`, transitionDelay: `${400 + index * 50}ms` }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-8 ${item.fuego > 60 ? "text-[#E31837]" : ""}`}>
                      {item.fuego}%
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#27AE60] rounded-full transition-all duration-700"
                        style={{ width: `${item.jalapeno * 3}%`, transitionDelay: `${400 + index * 50}ms` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{item.jalapeno}%</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Insight */}
          <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600 flex-shrink-0" />
              <p className="text-amber-800 text-sm">
                <span className="font-bold">Insight:</span> Cuando un sabor domina {">"}50%, indica problema de exhibición: el cliente no ve las otras opciones
              </p>
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
            <span className="font-bold">Acción propuesta:</span> Auditoría de acomodo del PDQ en estas 6 tiendas para balancear visibilidad de los 3 sabores
          </p>
          <ArrowRight className="text-green-600" />
        </div>
      </div>
    </div>
  )
}
