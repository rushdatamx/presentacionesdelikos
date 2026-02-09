"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Package, Store, CheckCircle, ArrowRight } from "lucide-react"

const productosAfectados = [
  { producto: "Papa Jalapeño 340gr", dias: 118, ventaPerdida: 119857 },
  { producto: "Papas Fritas Jalapeño", dias: 91, ventaPerdida: 72353 },
  { producto: "Papa Fuego 340gr", dias: 65, ventaPerdida: 58420 },
  { producto: "Papa Natural 340gr", dias: 42, ventaPerdida: 45200 },
]

const tiendasQuiebres = [
  { tienda: "MT MTY LINCOLN", dias: 102 },
  { tienda: "MT MTY ZUAZUA", dias: 86 },
  { tienda: "MT NVO REFORMA", dias: 81 },
  { tienda: "MT VALLE STA MARIA", dias: 77 },
  { tienda: "MT MTY ANZURES", dias: 72 },
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

export default function Slide4QuiebresStock() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [hoveredTienda, setHoveredTienda] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const ventaPerdidaAnimada = useCountUp(295830, 2000, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#E31837]/10 rounded-xl">
            <AlertTriangle size={24} className="text-[#E31837]" />
          </div>
          <span className="text-sm font-semibold text-[#E31837] uppercase tracking-wider">Oportunidad #1</span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Venta Perdida por Falta de Inventario
        </h1>
      </div>

      {/* Main KPI */}
      <div
        className={`flex items-center justify-between p-6 bg-gradient-to-r from-[#E31837]/10 to-orange-100 rounded-2xl border border-[#E31837]/20 mb-6 transition-all duration-700 hover:shadow-xl cursor-pointer ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div>
          <span className="text-sm text-gray-600">Venta perdida estimada</span>
          <span className="block text-5xl font-bold text-[#E31837]">
            ${(ventaPerdidaAnimada / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="max-w-md p-4 bg-white/80 rounded-xl border border-[#F7B500]/30">
          <p className="text-gray-700 font-medium">
            "Si mejoramos el abasto en estas tiendas, <span className="text-[#E31837] font-bold">ambos ganamos</span>"
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-8">
        {/* Products affected */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Package size={18} className="text-[#E31837]" />
            Productos más afectados
          </h3>

          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-3 bg-gray-100 text-xs font-semibold text-gray-600">
              <span>Producto</span>
              <span className="text-center">Días sin stock</span>
              <span className="text-right">Venta perdida</span>
            </div>

            {productosAfectados.map((item, index) => {
              const isHovered = hoveredProduct === index
              const maxDias = 118
              const barWidth = (item.dias / maxDias) * 100

              return (
                <div
                  key={item.producto}
                  className={`grid grid-cols-3 gap-4 p-3 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    isHovered ? "bg-[#E31837]/5 scale-[1.01]" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <span className={`font-medium text-sm transition-all duration-300 ${
                    isHovered ? "font-bold text-[#E31837]" : "text-gray-800"
                  }`}>
                    {item.producto}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isLoaded ? `${barWidth}%` : "0%",
                          backgroundColor: item.dias > 100 ? "#E31837" : item.dias > 50 ? "#F7B500" : "#6B7280",
                          transitionDelay: `${400 + index * 100}ms`
                        }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-12 transition-all duration-300 ${
                      isHovered ? "scale-110" : ""
                    }`} style={{ color: item.dias > 100 ? "#E31837" : "#1A1A1A" }}>
                      {item.dias}d
                    </span>
                  </div>
                  <span className={`text-right font-bold text-sm transition-all duration-300 ${
                    isHovered ? "scale-105 text-[#E31837]" : "text-gray-900"
                  }`}>
                    ${(item.ventaPerdida / 1000).toFixed(0)}K
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stores with more stockouts */}
        <div
          className={`w-[320px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Store size={18} className="text-[#F7B500]" />
            Tiendas con más quiebres
          </h3>

          <div className="space-y-2">
            {tiendasQuiebres.map((item, index) => {
              const isHovered = hoveredTienda === index

              return (
                <div
                  key={item.tienda}
                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#F7B500] bg-[#F7B500]/10 scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredTienda(index)}
                  onMouseLeave={() => setHoveredTienda(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm transition-all duration-300 ${
                      isHovered ? "font-bold" : "font-medium"
                    }`}>
                      {item.tienda.replace("MT ", "")}
                    </span>
                    <span className={`text-sm font-bold transition-all duration-300 ${
                      isHovered ? "text-[#E31837] scale-110" : "text-gray-600"
                    }`}>
                      {item.dias} días-producto
                    </span>
                  </div>
                </div>
              )
            })}
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
            <span className="font-bold">Acción propuesta:</span> Incrementar inventario mínimo de Papa Jalapeño y Fuego en formato 340gr
          </p>
          <ArrowRight className="text-green-600" />
        </div>
      </div>
    </div>
  )
}
