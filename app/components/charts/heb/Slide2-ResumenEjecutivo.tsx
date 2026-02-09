"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, Package, Store, AlertTriangle, Target, Sparkles } from "lucide-react"

const metricas = [
  { label: "Venta total", valor: "$4,583,016", icono: DollarSign, color: "#E31837" },
  { label: "Unidades vendidas", valor: "191,177", icono: Package, color: "#F7B500" },
  { label: "Tiendas activas", valor: "26", icono: Store, color: "#1A1A1A" },
  { label: "Crecimiento vs anterior", valor: "+27.1%", icono: TrendingUp, color: "#27AE60" },
]

const oportunidades = [
  { label: "Quiebres de stock", valor: "$295,830", porcentaje: 32, color: "#E31837" },
  { label: "Tiendas con potencial", valor: "$509,347", porcentaje: 55, color: "#F7B500" },
  { label: "Cobertura de productos", valor: "$123,906", porcentaje: 13, color: "#6B7280" },
]

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
        setCount(Math.round(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startAnimation])

  return count
}

export default function Slide2ResumenEjecutivo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)
  const [hoveredOp, setHoveredOp] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const ventaAnimada = useCountUp(4.58, 2000, isLoaded)
  const crecimientoAnimado = useCountUp(27, 1800, isLoaded)
  const oportunidadAnimada = useCountUp(0.93, 2200, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Resumen del Período
        </h1>
        <p className="text-lg text-gray-500 mt-2">Agosto 2025 - Febrero 2026</p>
      </div>

      {/* Main KPI */}
      <div
        className={`flex items-center justify-center gap-8 mb-8 p-6 bg-gradient-to-r from-[#E31837]/10 via-white to-[#F7B500]/10 rounded-2xl border border-gray-200 transition-all duration-700 hover:shadow-xl cursor-pointer ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="text-center">
          <span className="text-6xl font-bold text-[#E31837]">${ventaAnimada.toFixed(2)}M</span>
          <span className="text-2xl text-gray-500 ml-2">en ventas</span>
        </div>
        <div className="w-px h-16 bg-gray-300" />
        <div className="flex items-center gap-3">
          <TrendingUp size={40} className="text-[#27AE60]" />
          <div>
            <span className="text-5xl font-bold text-[#27AE60]">+{crecimientoAnimado}%</span>
            <span className="block text-gray-500">crecimiento</span>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="flex-1 flex gap-8">
        {/* Left column - Metrics */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#F7B500]" />
            Métricas del período
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {metricas.map((metrica, index) => {
              const Icon = metrica.icono
              const isHovered = hoveredMetric === index

              return (
                <div
                  key={metrica.label}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#E31837] shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isHovered ? "scale-110" : ""
                      }`}
                      style={{ backgroundColor: `${metrica.color}15` }}
                    >
                      <Icon size={20} style={{ color: metrica.color }} />
                    </div>
                    <span className="text-sm text-gray-500">{metrica.label}</span>
                  </div>
                  <span
                    className={`text-2xl font-bold transition-all duration-300 ${
                      isHovered ? "scale-105" : ""
                    }`}
                    style={{ color: metrica.color }}
                  >
                    {metrica.valor}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column - Opportunities */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Target size={18} className="text-[#E31837]" />
            Oportunidad identificada
          </h3>

          {/* Total opportunity */}
          <div className="p-5 bg-gradient-to-r from-[#E31837]/10 to-[#F7B500]/10 rounded-2xl mb-4 border border-[#E31837]/20">
            <span className="text-sm text-gray-600">Total oportunidad</span>
            <span className="block text-4xl font-bold text-[#E31837]">${oportunidadAnimada.toFixed(2)}M</span>
          </div>

          {/* Opportunity breakdown */}
          <div className="space-y-3">
            {oportunidades.map((op, index) => {
              const isHovered = hoveredOp === index

              return (
                <div
                  key={op.label}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-gray-400 shadow-md scale-[1.01]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredOp(index)}
                  onMouseLeave={() => setHoveredOp(null)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{op.label}</span>
                    <span className="font-bold" style={{ color: op.color }}>{op.valor}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: isLoaded ? `${op.porcentaje}%` : "0%",
                        backgroundColor: op.color,
                        transitionDelay: `${500 + index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-sm text-gray-400 text-center flex items-center justify-center gap-2">
          <AlertTriangle size={14} />
          Datos verificados del portal MiTienda HEB
        </p>
      </div>
    </div>
  )
}
