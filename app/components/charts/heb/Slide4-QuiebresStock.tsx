"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, TrendingDown, Truck, ArrowRight } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Tiendas con DOS < 14 días = Stock bajo, rotación alta, necesitan surtido
// Excluye CAT MONTERREY (2160) - es CEDIS

// Tiendas que necesitan surtido (combinando ambos PDQ)
const tiendasBajoStock = [
  {
    tienda: "REY RIO BRAVO",
    codigo: "2972",
    problema: "PDQ 45gr casi agotado",
    dosMin: 4,
    saboresBajos: ["NATURAL (11d)", "FUEGO (7d)", "JALAPEÑO (4d)"],
    ventaDiaria: 51,
    color: "#E31837"
  },
  {
    tienda: "REY SAN FERNANDO",
    codigo: "9107",
    problema: "PDQ 45gr Natural crítico",
    dosMin: 3,
    saboresBajos: ["NATURAL (3d)", "JALAPEÑO (8d)"],
    ventaDiaria: 48,
    color: "#E31837"
  },
  {
    tienda: "REY AEROPUERTO",
    codigo: "2995",
    problema: "PDQ 45gr bajo",
    dosMin: 7,
    saboresBajos: ["NATURAL (7d)", "JALAPEÑO (9d)"],
    ventaDiaria: 29,
    color: "#F7B500"
  },
  {
    tienda: "MTY AZTLAN",
    codigo: "2956",
    problema: "PDQ 45gr Fuego agotado",
    dosMin: 0,
    saboresBajos: ["FUEGO (0d)"],
    ventaDiaria: 12,
    color: "#E31837"
  },
  {
    tienda: "MTY BUENA VISTA",
    codigo: "9104",
    problema: "PDQ 340gr bajo",
    dosMin: 0,
    saboresBajos: ["SAL (0d)", "FUEGO (0d)", "JALAPEÑO (0d)"],
    ventaDiaria: 3,
    color: "#E31837"
  },
  {
    tienda: "SAL SATELITE",
    codigo: "2938",
    problema: "PDQ 340gr bajo",
    dosMin: 0,
    saboresBajos: ["SAL (0d)", "FUEGO (0d)", "JALAPEÑO (0d)"],
    ventaDiaria: 2,
    color: "#E31837"
  },
  {
    tienda: "MTY ZUAZUA",
    codigo: "2920",
    problema: "PDQ 340gr parcial",
    dosMin: 0,
    saboresBajos: ["SAL (0d)", "JALAPEÑO (0d)"],
    ventaDiaria: 4,
    color: "#F7B500"
  },
]

const totalTiendas = tiendasBajoStock.length

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
        {/* Left - Tiendas List (2 columns) */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid grid-cols-2 gap-2">
            {tiendasBajoStock.map((tienda, index) => {
              const isHovered = hoveredIndex === index
              const isCritical = tienda.dosMin < 7

              return (
                <div
                  key={tienda.codigo}
                  className={`p-2.5 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#E31837] shadow-lg bg-red-50"
                      : isCritical
                      ? "border-red-200 bg-red-50/50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-2">
                    {/* Indicator */}
                    <div
                      className={`w-1 h-8 rounded-full`}
                      style={{ backgroundColor: tienda.color }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-[#1A1A1A] truncate">{tienda.tienda}</span>
                        {isCritical && (
                          <span className="px-1.5 py-0.5 bg-[#E31837] text-white text-[9px] font-bold rounded-full shrink-0">
                            CRÍTICO
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 truncate">{tienda.problema}</p>
                    </div>

                    {/* DOS Badge */}
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold" style={{ color: tienda.color }}>
                        {tienda.dosMin}d
                      </p>
                      <p className="text-[9px] text-gray-400">DOS</p>
                    </div>
                  </div>

                  {/* Sabores */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {tienda.saboresBajos.map((sabor, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] rounded"
                      >
                        {sabor}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right - Summary */}
        <div
          className={`w-[280px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Alert Card */}
          <div className="p-4 bg-gradient-to-br from-[#E31837]/10 to-[#E31837]/5 rounded-xl border-2 border-[#E31837]/30 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={18} className="text-[#E31837]" />
              <span className="font-bold text-sm text-[#1A1A1A]">Impacto</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">
              Cuando el producto se agota, el cliente compra otra marca.
              Estas <span className="font-bold text-[#E31837]">{totalTiendas} tiendas</span> están en riesgo.
            </p>
            <div className="p-2 bg-white rounded-lg">
              <p className="text-[10px] text-gray-500 mb-0.5">Tiendas críticas (DOS &lt; 7d)</p>
              <p className="text-xl font-bold text-[#E31837]">
                {tiendasBajoStock.filter(t => t.dosMin < 7).length}
              </p>
            </div>
          </div>

          {/* What is DOS */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700 mb-1.5 text-xs">¿Qué es DOS?</p>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              <span className="font-bold">Días de Inventario</span> = cuántos días dura el stock según la venta diaria.
            </p>
            <div className="mt-2 pt-2 border-t border-gray-200 space-y-1 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#E31837]" />
                <span className="text-gray-600">&lt; 7 días = Crítico</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#F7B500]" />
                <span className="text-gray-600">7-14 días = Bajo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                <span className="text-gray-600">&gt; 14 días = OK</span>
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
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-[#27AE60]" />
            <div>
              <p className="font-bold text-sm text-[#1A1A1A]">Propuesta: Surtir estas {totalTiendas} tiendas</p>
              <p className="text-xs text-gray-600">Ver detalle por producto en las siguientes slides</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27AE60] text-white rounded-lg font-semibold text-xs">
            <span>Ver propuesta</span>
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
