"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Package, Zap, CheckCircle } from "lucide-react"

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
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#27AE60]/10 rounded-xl">
            <TrendingUp size={28} className="text-[#27AE60]" />
          </div>
          <span className="text-sm font-semibold text-[#27AE60] uppercase tracking-wider">
            Performance PDQ
          </span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          El producto está rotando
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {metricas.periodo} | 25 tiendas HEB | Solo PDQ Papa Casera
        </p>
      </div>

      {/* Main Message */}
      <div
        className={`flex-1 flex gap-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left - Big Number */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="p-8 bg-gradient-to-br from-[#27AE60]/10 to-[#27AE60]/5 rounded-3xl border-2 border-[#27AE60]/30">
            <p className="text-xl text-gray-600 mb-2">Unidades vendidas en tienda</p>
            <div className="flex items-baseline gap-3">
              <span className="text-8xl font-bold text-[#27AE60]">
                {(unidadesAnimadas / 1000).toFixed(0)}K
              </span>
              <span className="text-2xl text-gray-500">piezas</span>
            </div>
            <p className="text-gray-500 mt-4">
              = <span className="font-bold text-[#1A1A1A]">{rotacionAnimada}</span> unidades/día promedio
            </p>
          </div>

          {/* Supporting stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-[#F7B500]" />
                <span className="text-sm text-gray-500">PDQ 45gr</span>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">125,569</p>
              <p className="text-sm text-gray-400">unidades (91% del mix)</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-[#E31837]" />
                <span className="text-sm text-gray-500">PDQ 340gr</span>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">2,849</p>
              <p className="text-sm text-gray-400">unidades (9% del mix)</p>
            </div>
          </div>
        </div>

        {/* Right - Key Points */}
        <div className="w-[450px] flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            ¿Por qué crecer con PDQ?
          </h3>

          <div className="space-y-4">
            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-sm transition-all duration-500 hover:border-[#27AE60] hover:shadow-md ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#27AE60]/10 rounded-xl">
                  <Zap size={24} className="text-[#27AE60]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Exhibidor listo para piso</p>
                  <p className="text-gray-500 mt-1">
                    PDQ llega armado. Solo colocar en anaquel o isla.
                    Menos mano de obra para la tienda.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-sm transition-all duration-500 hover:border-[#F7B500] hover:shadow-md ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#F7B500]/10 rounded-xl">
                  <TrendingUp size={24} className="text-[#F7B500]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Mayor visibilidad = Mayor rotación</p>
                  <p className="text-gray-500 mt-1">
                    Exhibición secundaria en pasillo genera compra por impulso.
                    658 piezas/día lo comprueban.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-sm transition-all duration-500 hover:border-[#E31837] hover:shadow-md ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#E31837]/10 rounded-xl">
                  <CheckCircle size={24} className="text-[#E31837]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">3 sabores = Variedad completa</p>
                  <p className="text-gray-500 mt-1">
                    Cada PDQ incluye 3 sabores. El cliente encuentra
                    su favorito sin buscar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-700 ${
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
