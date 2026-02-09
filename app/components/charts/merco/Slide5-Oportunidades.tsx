"use client"

import { useState, useEffect } from "react"
import { TrendingUp, PieChart, Shield, Sparkles, CheckCircle, ArrowRight, Target } from "lucide-react"

const oportunidades = [
  {
    id: 1,
    titulo: "Papas 45g y 70g",
    descripcion: "Sell-through 84%, pueden pedir mas",
    color: "#27AE60",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    icon: TrendingUp,
    metricas: [
      { label: "Rotacion", value: "84%", numValue: 84 },
      { label: "Mix actual", value: "8%", numValue: 8 },
    ],
    estrategia: "Incrementar pedido semanal",
    impacto: "+$1.2M potencial"
  },
  {
    id: 2,
    titulo: "Cacahuates",
    descripcion: "Sell-through 83%, hay espacio para crecer",
    color: "#F7B500",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    icon: PieChart,
    metricas: [
      { label: "Mix actual", value: "10%", numValue: 10 },
      { label: "Meta", value: "15%", numValue: 15 },
    ],
    estrategia: "Ampliar exhibicion en tienda",
    impacto: "+$0.8M potencial"
  },
  {
    id: 3,
    titulo: "Diversificacion",
    descripcion: "Reducir dependencia de Tostada Roja",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    icon: Shield,
    metricas: [
      { label: "Tostada Roja", value: "65%", numValue: 65 },
      { label: "Objetivo", value: "50%", numValue: 50 },
    ],
    estrategia: "Promover otras categorias",
    impacto: "Reduce riesgo 30%"
  },
]

export default function Slide5Oportunidades() {
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

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-6 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="p-3 bg-[#F7B500] rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
          <Sparkles size={28} className="text-[#1A1A1A]" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Donde Podemos Crecer Juntos?
          </h1>
          <p className="text-lg text-gray-500 mt-1">Oportunidades de Crecimiento 2026</p>
        </div>
      </div>

      {/* Cards - animated */}
      <div className="flex-1 flex gap-6">
        {oportunidades.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index
          const isDimmed = selectedIndex !== null && selectedIndex !== index

          return (
            <div
              key={item.id}
              className={`flex-1 p-6 rounded-2xl border-2 shadow-md flex flex-col cursor-pointer transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                isActive
                  ? "scale-[1.03] shadow-2xl -translate-y-2"
                  : isDimmed
                  ? "opacity-40 scale-95"
                  : "hover:shadow-lg"
              }`}
              style={{
                backgroundColor: item.bgColor,
                borderColor: isActive ? item.color : item.borderColor,
                transitionDelay: `${200 + index * 150}ms`,
                borderWidth: isActive ? "3px" : "2px",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              {/* Icon - animated */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isActive ? "scale-110 shadow-lg" : ""
                }`}
                style={{ backgroundColor: item.color }}
              >
                <Icon size={28} className={`text-white transition-all duration-300 ${
                  isActive ? "animate-pulse" : ""
                }`} />
              </div>

              {/* Title */}
              <h2 className={`text-xl font-bold text-[#1A1A1A] mb-2 transition-all duration-300 ${
                isActive ? "scale-105 origin-left" : ""
              }`}>
                {item.titulo}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {item.descripcion}
              </p>

              {/* Metrics - with animated bars */}
              <div className="flex gap-3 mb-4">
                {item.metricas.map((metrica, metricIdx) => (
                  <div
                    key={metrica.label}
                    className={`flex-1 p-3 bg-white rounded-lg border transition-all duration-300 ${
                      isActive ? "border-gray-300 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <p className="text-xs text-gray-500 mb-1">{metrica.label}</p>
                    <p
                      className={`text-lg font-bold transition-all duration-300 ${
                        isActive ? "scale-110 origin-left" : ""
                      }`}
                      style={{ color: item.color }}
                    >
                      {metrica.value}
                    </p>
                    {/* Mini progress bar */}
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isLoaded ? `${metrica.numValue}%` : "0%",
                          backgroundColor: item.color,
                          transitionDelay: `${500 + index * 150 + metricIdx * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Impact indicator - appears on hover */}
              {isActive && (
                <div className="mb-4 px-3 py-2 bg-white/80 rounded-lg border border-gray-200 flex items-center gap-2 animate-fade-in">
                  <Target size={14} style={{ color: item.color }} />
                  <span className="text-xs font-semibold" style={{ color: item.color }}>
                    {item.impacto}
                  </span>
                </div>
              )}

              {/* Estrategia - enhanced with animation */}
              <div
                className={`mt-auto p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  isActive ? "scale-[1.02] shadow-lg" : ""
                }`}
                style={{ backgroundColor: item.color }}
              >
                <CheckCircle size={20} className={`text-white flex-shrink-0 ${
                  isActive ? "animate-bounce-subtle" : ""
                }`} />
                <div className="flex-1">
                  <p className="text-xs text-white/80 font-medium">Estrategia</p>
                  <p className="text-sm text-white font-semibold">
                    {item.estrategia}
                  </p>
                </div>
                {isActive && (
                  <ArrowRight size={18} className="text-white animate-pulse" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary banner - animated */}
      <div
        className={`mt-6 p-4 bg-[#1A1A1A] rounded-xl flex items-center justify-between transition-all duration-700 hover:shadow-xl cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <div className="flex items-center gap-3">
          <Shield size={22} className="text-[#F7B500] animate-pulse" />
          <span className="text-white font-medium">
            Beneficio clave de diversificar:
          </span>
        </div>
        <span className="text-[#F7B500] font-semibold">
          Protege a ambos ante cualquier problema de abasto
        </span>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Datos: Enero - Diciembre 2025
        </p>
      </div>
    </div>
  )
}
