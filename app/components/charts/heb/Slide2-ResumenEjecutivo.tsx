"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Package } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Fuente: venta-delikos.csv + inventario-delikos.csv
// Período: Jul 2025 - Feb 2026 | Excluye CAT MONTERREY (2160)

const metricas = {
  unidadesVendidas: 128418,
  tiendasActivas: 25,
  diasAnalisis: 195, // Jul 30 2025 - Feb 9 2026
  rotacionDiaria: 658, // 128418 / 195 días
  periodo: "Jul 2025 - Feb 2026"
}

// Hook para animación count-up
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
    return () => clearTimeout(timer)
  }, [end, duration, startAnimation])

  return count
}

export default function Slide2ResumenEjecutivo() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const unidadesAnimadas = useCountUp(metricas.unidadesVendidas, 2000, isLoaded)
  const rotacionAnimada = useCountUp(metricas.rotacionDiaria, 1500, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-8 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-[#27AE60]/10 rounded-lg">
            <TrendingUp size={22} className="text-[#27AE60]" />
          </div>
          <span className="text-xs font-semibold text-[#27AE60] uppercase tracking-wider">
            Performance PDQ
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
          El producto está rotando
        </h1>
        <p className="text-base text-gray-500 mt-1">
          {metricas.periodo} | 25 tiendas HEB | Solo PDQ Papa Casera
        </p>
      </div>

      {/* Main Message */}
      <div
        className={`flex-1 flex gap-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left - Big Number */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="p-6 bg-gradient-to-br from-[#27AE60]/10 to-[#27AE60]/5 rounded-2xl border-2 border-[#27AE60]/30">
            <p className="text-lg text-gray-600 mb-2">Unidades vendidas en tienda</p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-bold text-[#27AE60]">
                {(unidadesAnimadas / 1000).toFixed(0)}K
              </span>
              <span className="text-xl text-gray-500">piezas</span>
            </div>
            <p className="text-gray-500 mt-3">
              = <span className="font-bold text-[#1A1A1A]">{rotacionAnimada}</span> unidades/día promedio
            </p>
          </div>
        </div>

        {/* Right - Breakdown by PDQ type */}
        <div className="w-[420px] flex flex-col justify-center">
          <h3 className="text-base font-semibold text-gray-700 mb-4">
            Desglose por presentación
          </h3>

          <div className="space-y-4">
            {/* PDQ 45gr Card */}
            <div
              className={`p-4 bg-white rounded-xl border-2 border-[#F7B500]/30 shadow-sm transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-[#F7B500]/10 rounded-lg">
                  <Package size={20} className="text-[#F7B500]" />
                </div>
                <span className="font-bold text-[#1A1A1A]">PDQ 45gr</span>
                <span className="ml-auto px-2 py-0.5 bg-[#F7B500]/10 text-[#F7B500] text-xs font-bold rounded-full">
                  91% del mix
                </span>
              </div>
              <p className="text-3xl font-bold text-[#F7B500] mb-1">125,569</p>
              <p className="text-sm text-gray-500">unidades vendidas</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">643 unidades/día</span> promedio
                </p>
              </div>
            </div>

            {/* PDQ 340gr Card */}
            <div
              className={`p-4 bg-white rounded-xl border-2 border-[#E31837]/30 shadow-sm transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-[#E31837]/10 rounded-lg">
                  <Package size={20} className="text-[#E31837]" />
                </div>
                <span className="font-bold text-[#1A1A1A]">PDQ 340gr</span>
                <span className="ml-auto px-2 py-0.5 bg-[#E31837]/10 text-[#E31837] text-xs font-bold rounded-full">
                  9% del mix
                </span>
              </div>
              <p className="text-3xl font-bold text-[#E31837] mb-1">2,849</p>
              <p className="text-sm text-gray-500">unidades vendidas</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">15 unidades/día</span> promedio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-4 pt-3 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-xs text-gray-400 text-center">
          Fuente: Portal MI TIENDA (Sell-Out) | Período: {metricas.periodo} | Excluye CAT Monterrey (CEDIS)
        </p>
      </div>
    </div>
  )
}
