"use client"

import { useState, useEffect } from "react"
import { Target, CheckCircle, AlertTriangle, Package, ArrowRight, Truck } from "lucide-react"

const acciones = [
  {
    num: 1,
    oportunidad: "Quiebres de stock",
    monto: "$340K",
    accion: "Incrementar inventario mínimo de Papa Casera Jalapeño y Fuego 45gr",
    responsable: "MI TIENDA + DELIKOS",
    color: "#E31837",
    icono: AlertTriangle,
  },
  {
    num: 2,
    oportunidad: "Surtido PDQ 340gr",
    monto: "3 tiendas",
    accion: "Surtir PDQ completo en: MTY Zuazua, SAL Satélite, MTY Buena Vista",
    responsable: "DELIKOS",
    color: "#F7B500",
    icono: Truck,
  },
  {
    num: 3,
    oportunidad: "Surtido PDQ 45gr",
    monto: "5 tiendas",
    accion: "Surtir PDQ completo en: CAT Monterrey, MTY Aztlán, REY Río Bravo, REY Aeropuerto, REY San Fernando",
    responsable: "DELIKOS",
    color: "#27AE60",
    icono: Package,
  },
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

export default function Slide8ProximosPasos() {
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
  const oportunidadAnimada = useCountUp(340000, 2000, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-gray-50 to-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-6 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#E31837]/10 flex items-center justify-center">
          <Target size={28} className="text-[#E31837]" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Plan de Acción Conjunto
          </h1>
          <p className="text-lg text-gray-500 mt-1">Próximos pasos para capitalizar oportunidades</p>
        </div>
      </div>

      {/* Main KPI */}
      <div
        className={`p-6 bg-gradient-to-r from-[#E31837]/10 via-[#F7B500]/10 to-[#27AE60]/10 rounded-2xl border border-[#E31837]/20 mb-6 text-center transition-all duration-700 hover:shadow-xl cursor-pointer ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <span className="text-lg text-gray-600">Oportunidad total identificada</span>
        <span className="block text-6xl font-bold text-[#E31837] mt-2">
          ${(oportunidadAnimada / 1000000).toFixed(2)}M
        </span>
      </div>

      {/* Actions Table */}
      <div
        className={`flex-1 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-600">
            <span className="col-span-1">#</span>
            <span className="col-span-2">Oportunidad</span>
            <span className="col-span-2 text-right">Monto</span>
            <span className="col-span-5">Acción Propuesta</span>
            <span className="col-span-2 text-center">Responsable</span>
          </div>

          {/* Rows */}
          {acciones.map((item, index) => {
            const Icon = item.icono
            const isActive = activeIndex === index
            const isDimmed = selectedIndex !== null && selectedIndex !== index

            return (
              <div
                key={item.num}
                className={`grid grid-cols-12 gap-4 p-5 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                  isActive ? "bg-gray-50 scale-[1.01]" : isDimmed ? "opacity-40" : "hover:bg-gray-50"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(index)}
              >
                {/* Number */}
                <div className="col-span-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.num}
                  </div>
                </div>

                {/* Opportunity */}
                <div className="col-span-2 flex items-center gap-2">
                  <Icon size={18} style={{ color: item.color }} className={isActive ? "animate-bounce-subtle" : ""} />
                  <span className={`font-medium transition-all duration-300 ${
                    isActive ? "font-bold" : ""
                  }`}>
                    {item.oportunidad}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-2 flex items-center justify-end">
                  <span
                    className={`font-bold text-lg transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                    style={{ color: item.monto === "Cualitativo" ? "#6B7280" : item.color }}
                  >
                    {item.monto}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-5 flex items-center">
                  <span className={`text-gray-700 transition-all duration-300 ${
                    isActive ? "font-medium" : ""
                  }`}>
                    {item.accion}
                  </span>
                </div>

                {/* Responsible */}
                <div className="col-span-2 flex items-center justify-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive ? "scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: item.responsable.includes("MI TIENDA") && item.responsable.includes("DELIKOS")
                        ? "#E31837" + "20"
                        : item.responsable === "DELIKOS"
                        ? "#F7B500" + "20"
                        : "#1A1A1A" + "15",
                      color: item.responsable.includes("MI TIENDA") && item.responsable.includes("DELIKOS")
                        ? "#E31837"
                        : item.responsable === "DELIKOS"
                        ? "#B8860B"
                        : "#1A1A1A"
                    }}
                  >
                    {item.responsable}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
