"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Package, BarChart3 } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Fuente: venta-delikos.csv + inventario-delikos.csv
// Período: 2024-12 a 2026-04 (29 semanas fiscales) | Excluye CAT MONTERREY (2160)

const metricas = {
  unidadesVendidas: 134448,
  tiendasActivas: 25,
  diasAnalisis: 201,
  rotacionDiaria: 669,
  semanasFiscales: 29,
  periodo: "Periodo 2024-12 a 2026-04"
}

// Últimos 12 periodos fiscales - Sell-out MI TIENDA (excluye tienda 2160)
const periodos = [
  { periodo: "2025-06", unidades: 5586,  venta: 279217 },
  { periodo: "2025-07", unidades: 5089,  venta: 254272 },
  { periodo: "2025-08", unidades: 5800,  venta: 299635 },
  { periodo: "2025-09", unidades: 5314,  venta: 278593 },
  { periodo: "2025-10", unidades: 7591,  venta: 322453 },
  { periodo: "2025-11", unidades: 23838, venta: 466730 },
  { periodo: "2025-12", unidades: 28281, venta: 505908 },
  { periodo: "2025-13", unidades: 28610, venta: 553855 },
  { periodo: "2026-01", unidades: 27625, venta: 547220 },
  { periodo: "2026-02", unidades: 17265, venta: 479453 },
  { periodo: "2026-03", unidades: 31331, venta: 766003 },
  { periodo: "2026-04", unidades: 18429, venta: 475359 },
]

const maxUnidades = Math.max(...periodos.map(p => p.unidades))

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

  const formatMXN = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    return `$${(n / 1000).toFixed(0)}K`
  }

  return (
    <div className="w-[1280px] h-[720px] bg-white px-8 py-5 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-2 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-0.5">
          <div className="p-1 bg-[#27AE60]/10 rounded-lg">
            <TrendingUp size={18} className="text-[#27AE60]" />
          </div>
          <span className="text-[10px] font-semibold text-[#27AE60] uppercase tracking-wider">
            Performance PDQ
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
          El producto está rotando
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {metricas.periodo} ({metricas.semanasFiscales} semanas fiscales) | 25 tiendas MI TIENDA | Solo PDQ Papa Casera
        </p>
      </div>

      {/* Top KPI Row */}
      <div
        className={`flex gap-2 mb-2 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Big Number */}
        <div className="flex-1 p-3 bg-gradient-to-br from-[#27AE60]/10 to-[#27AE60]/5 rounded-xl border border-[#27AE60]/30">
          <p className="text-xs text-gray-600 mb-0.5">Unidades vendidas en tienda</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#27AE60]">
              {(unidadesAnimadas / 1000).toFixed(0)}K
            </span>
            <span className="text-sm text-gray-500">piezas</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            = <span className="font-bold text-[#1A1A1A]">{rotacionAnimada}</span> unidades/día promedio
          </p>
        </div>

        {/* PDQ 45gr */}
        <div
          className={`w-[240px] p-3 bg-white rounded-xl border-2 border-[#F7B500]/30 transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="p-0.5 bg-[#F7B500]/10 rounded">
              <Package size={14} className="text-[#F7B500]" />
            </div>
            <span className="font-bold text-xs text-[#1A1A1A]">PDQ 45gr</span>
            <span className="ml-auto px-1.5 py-0.5 bg-[#F7B500]/10 text-[#F7B500] text-[9px] font-bold rounded-full">
              87% mix
            </span>
          </div>
          <p className="text-xl font-bold text-[#F7B500]">129,932</p>
          <p className="text-[9px] text-gray-500">unidades | 646/día</p>
        </div>

        {/* PDQ 340gr */}
        <div
          className={`w-[240px] p-3 bg-white rounded-xl border-2 border-[#E31837]/30 transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="p-0.5 bg-[#E31837]/10 rounded">
              <Package size={14} className="text-[#E31837]" />
            </div>
            <span className="font-bold text-xs text-[#1A1A1A]">PDQ 340gr</span>
            <span className="ml-auto px-1.5 py-0.5 bg-[#E31837]/10 text-[#E31837] text-[9px] font-bold rounded-full">
              13% mix
            </span>
          </div>
          <p className="text-xl font-bold text-[#E31837]">4,516</p>
          <p className="text-[9px] text-gray-500">unidades | 22/día</p>
        </div>
      </div>

      {/* Tabla de últimos 12 periodos fiscales */}
      <div
        className={`flex-1 min-h-0 flex flex-col transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "350ms" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={14} className="text-[#1A1A1A]" />
          <h3 className="font-bold text-xs text-[#1A1A1A]">
            Comportamiento últimos 12 periodos fiscales
          </h3>
        </div>

        <div className="flex-1 min-h-0 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_1fr_80px_80px] gap-0 bg-gray-100 text-[9px] font-semibold text-gray-600 uppercase tracking-wider shrink-0">
            <div className="py-1 px-2">Periodo</div>
            <div className="py-1 px-2">Unidades</div>
            <div className="py-1 px-2 text-right">Unidades</div>
            <div className="py-1 px-2 text-right">Venta MXN</div>
          </div>

          {/* Table Rows */}
          <div className="flex-1 min-h-0 flex flex-col">
            {periodos.map((p, index) => {
              const barPct = (p.unidades / maxUnidades) * 100
              const prev = index > 0 ? periodos[index - 1] : null
              const cambio = prev ? ((p.unidades - prev.unidades) / prev.unidades) * 100 : null
              const isCurrentPeriod = p.periodo === "2026-04"

              return (
                <div
                  key={p.periodo}
                  className={`grid grid-cols-[80px_1fr_80px_80px] gap-0 border-t border-gray-100 items-center flex-1 transition-all duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  } ${isCurrentPeriod ? "bg-[#27AE60]/5" : ""}`}
                  style={{ transitionDelay: `${400 + index * 40}ms` }}
                >
                  <div className="px-2">
                    <span className={`text-[10px] font-semibold ${isCurrentPeriod ? "text-[#27AE60]" : "text-[#1A1A1A]"}`}>
                      {p.periodo}
                    </span>
                    {isCurrentPeriod && (
                      <span className="ml-0.5 text-[7px] text-[#27AE60] font-bold">*</span>
                    )}
                  </div>

                  {/* Bar */}
                  <div className="px-2 flex items-center gap-1.5">
                    <div className="flex-1 h-3 bg-gray-200/50 rounded overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-1000"
                        style={{
                          width: isLoaded ? `${barPct}%` : "0%",
                          transitionDelay: `${500 + index * 40}ms`,
                          background: p.unidades >= 20000
                            ? "linear-gradient(90deg, #27AE60, #2ECC71)"
                            : p.unidades >= 10000
                            ? "linear-gradient(90deg, #F7B500, #F9C846)"
                            : "linear-gradient(90deg, #E0E0E0, #BDBDBD)"
                        }}
                      />
                    </div>
                    {cambio !== null && (
                      <span className={`text-[8px] font-semibold w-8 text-right ${
                        cambio > 0 ? "text-[#27AE60]" : cambio < -10 ? "text-[#E31837]" : "text-gray-400"
                      }`}>
                        {cambio > 0 ? "+" : ""}{cambio.toFixed(0)}%
                      </span>
                    )}
                    {cambio === null && <span className="w-8" />}
                  </div>

                  <div className="px-2 text-right">
                    <span className="text-[10px] font-semibold text-[#1A1A1A]">
                      {p.unidades.toLocaleString()}
                    </span>
                  </div>

                  <div className="px-2 text-right">
                    <span className="text-[10px] text-gray-600">
                      {formatMXN(p.venta)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-1.5 pt-1.5 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-[9px] text-gray-400 text-center">
          Fuente: Portal MI TIENDA (Sell-Out) | {metricas.periodo} | Excluye CAT Monterrey (CEDIS) | *Periodo 2026-04 en curso (3 semanas)
        </p>
      </div>
    </div>
  )
}
