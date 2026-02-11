"use client"

import { useState, useEffect } from "react"
import { Package, Truck, CheckCircle } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Propuesta de surtido PDQ 45gr - 4 tiendas con DOS < 14 días
// Excluye CAT MONTERREY (2160)

const propuesta45 = [
  {
    tienda: "REY RIO BRAVO",
    codigo: "2972",
    sabores: [
      { nombre: "NATURAL", inv: 120, dos: 11, surtir: 290 },
      { nombre: "FUEGO", inv: 80, dos: 7, surtir: 321 },
      { nombre: "JALAPEÑO", inv: 66, dos: 4, surtir: 357 },
    ],
    totalSurtir: 968,
    prioridad: "ALTA"
  },
  {
    tienda: "REY SAN FERNANDO",
    codigo: "9107",
    sabores: [
      { nombre: "NATURAL", inv: 50, dos: 3, surtir: 461 },
      { nombre: "FUEGO", inv: 171, dos: 14, surtir: 207 },
      { nombre: "JALAPEÑO", inv: 105, dos: 8, surtir: 314 },
    ],
    totalSurtir: 982,
    prioridad: "ALTA"
  },
  {
    tienda: "REY AEROPUERTO",
    codigo: "2995",
    sabores: [
      { nombre: "NATURAL", inv: 66, dos: 7, surtir: 141 },
      { nombre: "FUEGO", inv: 123, dos: 19, surtir: 50 },
      { nombre: "JALAPEÑO", inv: 77, dos: 9, surtir: 116 },
    ],
    totalSurtir: 307,
    prioridad: "MEDIA"
  },
  {
    tienda: "MTY AZTLAN",
    codigo: "2956",
    sabores: [
      { nombre: "NATURAL", inv: 457, dos: 337, surtir: 0 },
      { nombre: "FUEGO", inv: 449, dos: 0, surtir: 111 },
      { nombre: "JALAPEÑO", inv: 486, dos: 1514, surtir: 0 },
    ],
    totalSurtir: 111,
    prioridad: "BAJA"
  },
]

const totalPiezas = propuesta45.reduce((acc, t) => acc + t.totalSurtir, 0)
const totalTiendas = propuesta45.length

export default function Slide7PDQ45() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedTienda, setExpandedTienda] = useState<number | null>(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#F7B500]/10 rounded-xl">
                <Package size={28} className="text-[#F7B500]" />
              </div>
              <span className="text-sm font-semibold text-[#F7B500] uppercase tracking-wider">
                Propuesta de Surtido
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 45gr: {totalTiendas} tiendas a surtir
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Detalle de cantidades por tienda y sabor
            </p>
          </div>

          {/* Summary */}
          <div className="flex gap-4">
            <div className="px-5 py-3 bg-[#F7B500]/10 rounded-xl border border-[#F7B500]/20">
              <p className="text-sm text-gray-600">Total piezas</p>
              <p className="text-3xl font-bold text-[#F7B500]">{totalPiezas.toLocaleString()}</p>
            </div>
            <div className="px-5 py-3 bg-gray-100 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600">PDQ completos</p>
              <p className="text-3xl font-bold text-[#1A1A1A]">~{Math.ceil(totalPiezas / 72)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Propuesta Cards */}
      <div className="flex-1 flex gap-4">
        {propuesta45.map((tienda, index) => {
          const isExpanded = expandedTienda === index
          const prioridadColor = {
            "ALTA": "#E31837",
            "MEDIA": "#F7B500",
            "BAJA": "#27AE60"
          }[tienda.prioridad]

          return (
            <div
              key={tienda.codigo}
              className={`flex-1 bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 cursor-pointer ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isExpanded ? "border-[#F7B500] shadow-xl" : "border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => setExpandedTienda(isExpanded ? null : index)}
            >
              {/* Header */}
              <div className={`p-4 ${isExpanded ? "bg-[#F7B500]/10" : "bg-gray-50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: prioridadColor }}
                  >
                    {tienda.prioridad}
                  </span>
                  <span className="text-xs text-gray-400">#{tienda.codigo}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">{tienda.tienda}</h3>
              </div>

              {/* Sabores */}
              <div className="p-4 flex-1">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  Por sabor
                </p>
                <div className="space-y-2">
                  {tienda.sabores.map((sabor) => {
                    const colorMap: Record<string, string> = {
                      "NATURAL": "#F7B500",
                      "FUEGO": "#E31837",
                      "JALAPEÑO": "#27AE60",
                    }
                    const color = colorMap[sabor.nombre] || "#gray"

                    return (
                      <div
                        key={sabor.nombre}
                        className="p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="font-medium text-sm text-gray-800">{sabor.nombre}</span>
                          </div>
                          {sabor.surtir > 0 ? (
                            <span className="px-2 py-0.5 bg-[#F7B500]/10 text-[#F7B500] text-xs font-bold rounded">
                              +{sabor.surtir}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              OK
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Inv: {sabor.inv}</span>
                          <span>DOS: {sabor.dos > 500 ? ">500" : sabor.dos}d</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-[#F7B500]">
                    {tienda.totalSurtir} pzs
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div
        className={`mt-6 p-5 bg-gradient-to-r from-[#F7B500]/10 to-[#F7B500]/5 rounded-2xl border border-[#F7B500]/30 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Truck size={28} className="text-[#F7B500]" />
            <div>
              <p className="font-bold text-[#1A1A1A]">
                Pedido PDQ 45gr: {totalPiezas.toLocaleString()} piezas en {totalTiendas} tiendas
              </p>
              <p className="text-sm text-gray-600">
                Equivale a ~{Math.ceil(totalPiezas / 72)} PDQ completos (72 pzs c/u)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-[#F7B500] text-white rounded-xl font-semibold cursor-pointer hover:bg-[#D99F00] transition-colors">
            <CheckCircle size={18} />
            <span>Aprobar pedido</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Fuente: Inventario MI TIENDA al 09/Feb/2026 | Cantidades calculadas para 30 días de cobertura | Excluye CAT Monterrey
        </p>
      </div>
    </div>
  )
}
