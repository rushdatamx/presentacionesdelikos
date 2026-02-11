"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, TrendingDown, Truck, ArrowRight, PackageX, Eye } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Tiendas con DOS < 14 días = Stock bajo, rotación alta, necesitan surtido
// Excluye CAT MONTERREY (2160) - es CEDIS

// TIPO 1: Stock bajo (hay venta pero poco inventario)
const tiendasStockBajo = [
  {
    tienda: "REY RIO BRAVO",
    codigo: "2972",
    pdq: "45gr",
    dosMin: 4,
    inventario: 66,
    ventaDiaria: 17,
  },
  {
    tienda: "REY SAN FERNANDO",
    codigo: "9107",
    pdq: "45gr",
    dosMin: 3,
    inventario: 50,
    ventaDiaria: 17,
  },
  {
    tienda: "REY AEROPUERTO",
    codigo: "2995",
    pdq: "45gr",
    dosMin: 7,
    inventario: 66,
    ventaDiaria: 9,
  },
]

// TIPO 2: Problema de anaquel (hay inventario pero 0 venta = no está exhibido)
const tiendasProblemaAnaquel = [
  {
    tienda: "MTY AZTLAN",
    codigo: "2956",
    pdq: "45gr",
    inventario: 449,
  },
  {
    tienda: "MTY BUENA VISTA",
    codigo: "9104",
    pdq: "340gr",
    inventario: 160,
  },
  {
    tienda: "SAL SATELITE",
    codigo: "2938",
    pdq: "340gr",
    inventario: 160,
  },
  {
    tienda: "MTY ZUAZUA",
    codigo: "2920",
    pdq: "340gr",
    inventario: 82,
  },
]

const totalTiendas = tiendasStockBajo.length + tiendasProblemaAnaquel.length

export default function Slide4OportunidadSurtido() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-white p-8 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-[#E31837]/10 rounded-lg">
            <AlertTriangle size={22} className="text-[#E31837]" />
          </div>
          <span className="text-xs font-semibold text-[#E31837] uppercase tracking-wider">
            Atención
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
          Estas tiendas se están quedando sin producto
        </h1>
        <p className="text-base text-gray-500 mt-1">
          {totalTiendas} tiendas con menos de 14 días de inventario
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4">
        {/* Left Column - Two sections */}
        <div
          className={`flex-1 flex flex-col gap-3 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Section 1: Stock Bajo */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-[#E31837]/10 rounded">
                <TrendingDown size={14} className="text-[#E31837]" />
              </div>
              <span className="text-xs font-bold text-[#E31837]">STOCK BAJO</span>
              <span className="text-[10px] text-gray-500">({tiendasStockBajo.length} tiendas) - Necesitan resurtido</span>
            </div>
            <div className="space-y-1.5">
              {tiendasStockBajo.map((tienda, index) => {
                const isCritical = tienda.dosMin < 7
                return (
                  <div
                    key={tienda.codigo}
                    className={`p-2 rounded-lg border-2 transition-all duration-300 ${
                      isCritical ? "border-red-300 bg-red-50" : "border-yellow-300 bg-yellow-50"
                    }`}
                    style={{ transitionDelay: `${300 + index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-10 rounded-full ${isCritical ? "bg-[#E31837]" : "bg-[#F7B500]"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="font-bold text-sm text-[#1A1A1A] truncate">{tienda.tienda}</span>
                          {isCritical && (
                            <span className="px-1.5 py-0.5 bg-[#E31837] text-white text-[9px] font-bold rounded-full shrink-0">
                              CRÍTICO
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500">PDQ {tienda.pdq}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[10px]">
                          <span className="text-gray-600">Inv: <span className="font-semibold">{tienda.inventario} pzs</span></span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">Venta: <span className="font-semibold text-[#E31837]">{tienda.ventaDiaria} pzs/día</span></span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xl font-bold ${isCritical ? "text-[#E31837]" : "text-[#F7B500]"}`}>
                          {tienda.dosMin}d
                        </p>
                        <p className="text-[9px] text-gray-400">DOS</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section 2: Problema de Anaquel */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-[#9333EA]/10 rounded">
                <Eye size={14} className="text-[#9333EA]" />
              </div>
              <span className="text-xs font-bold text-[#9333EA]">PROBLEMA DE ANAQUEL</span>
              <span className="text-[10px] text-gray-500">({tiendasProblemaAnaquel.length} tiendas) - Hay inv. pero no vende</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {tiendasProblemaAnaquel.map((tienda, index) => (
                <div
                  key={tienda.codigo}
                  className="p-2 rounded-lg border-2 border-[#9333EA]/30 bg-[#9333EA]/5 transition-all duration-300"
                  style={{ transitionDelay: `${500 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-10 rounded-full bg-[#9333EA]" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-bold text-sm text-[#1A1A1A] truncate">{tienda.tienda}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">PDQ {tienda.pdq}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px]">
                        <span className="text-gray-600">Inv: <span className="font-semibold">{tienda.inventario} pzs</span></span>
                        <span className="text-[#9333EA] font-semibold">| 0 venta</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="px-1.5 py-0.5 bg-[#9333EA] text-white text-[9px] font-bold rounded">
                        VERIFICAR
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Summary */}
        <div
          className={`w-[280px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Summary Cards */}
          <div className="space-y-2">
            {/* Stock Bajo Summary */}
            <div className="p-3 bg-gradient-to-br from-[#E31837]/10 to-[#E31837]/5 rounded-xl border border-[#E31837]/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={16} className="text-[#E31837]" />
                <span className="font-bold text-xs text-[#1A1A1A]">Stock Bajo</span>
              </div>
              <p className="text-[10px] text-gray-600 mb-1">
                Alta rotación, poco inventario
              </p>
              <p className="text-xl font-bold text-[#E31837]">{tiendasStockBajo.length} tiendas</p>
              <p className="text-[9px] text-gray-500">Acción: RESURTIR</p>
            </div>

            {/* Problema Anaquel Summary */}
            <div className="p-3 bg-gradient-to-br from-[#9333EA]/10 to-[#9333EA]/5 rounded-xl border border-[#9333EA]/30">
              <div className="flex items-center gap-2 mb-1">
                <Eye size={16} className="text-[#9333EA]" />
                <span className="font-bold text-xs text-[#1A1A1A]">Problema Anaquel</span>
              </div>
              <p className="text-[10px] text-gray-600 mb-1">
                Hay inventario pero 0 venta
              </p>
              <p className="text-xl font-bold text-[#9333EA]">{tiendasProblemaAnaquel.length} tiendas</p>
              <p className="text-[9px] text-gray-500">Acción: VERIFICAR en tienda</p>
            </div>
          </div>

          {/* Legend */}
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 mt-2">
            <p className="font-semibold text-gray-700 mb-1 text-[10px]">Tipos de problema</p>
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#E31837]" />
                <span className="text-gray-600">Stock bajo = resurtir</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#9333EA]" />
                <span className="text-gray-600">Anaquel = verificar exhibición</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`mt-3 p-3 bg-gradient-to-r from-[#27AE60]/10 to-[#27AE60]/5 rounded-lg border border-[#27AE60]/30 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-[#27AE60]" />
            <div>
              <p className="font-bold text-sm text-[#1A1A1A]">Próximos pasos</p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span><span className="font-semibold text-[#E31837]">{tiendasStockBajo.length}</span> tiendas → Resurtir</span>
                <span className="text-gray-300">|</span>
                <span><span className="font-semibold text-[#9333EA]">{tiendasProblemaAnaquel.length}</span> tiendas → Verificar anaquel</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27AE60] text-white rounded-lg font-semibold text-xs">
            <span>Ver detalle</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          Fuente: Inventario MI TIENDA al 09/Feb/2026 | Excluye CAT Monterrey (CEDIS) | DOS = Inventario ÷ Venta diaria
        </p>
      </div>
    </div>
  )
}
