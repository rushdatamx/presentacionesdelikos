"use client"

import { useState, useEffect } from "react"
import { Package, Truck, CheckCircle, ArrowRight } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Propuesta de surtido PDQ 340gr - 3 tiendas con DOS < 14 días
// Excluye CAT MONTERREY (2160)

const propuesta340 = [
  {
    tienda: "MTY BUENA VISTA",
    codigo: "9104",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, surtir: 160 },
      { nombre: "FUEGO", inv: 160, dos: 0, surtir: 160 },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, surtir: 160 },
    ],
    totalSurtir: 480,
    prioridad: "ALTA"
  },
  {
    tienda: "SAL SATELITE",
    codigo: "2938",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, surtir: 160 },
      { nombre: "FUEGO", inv: 160, dos: 0, surtir: 160 },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, surtir: 160 },
    ],
    totalSurtir: 480,
    prioridad: "ALTA"
  },
  {
    tienda: "MTY ZUAZUA",
    codigo: "2920",
    sabores: [
      { nombre: "SAL", inv: 82, dos: 0, surtir: 120 },
      { nombre: "FUEGO", inv: 84, dos: 785, surtir: 0 },
      { nombre: "JALAPEÑO", inv: 80, dos: 0, surtir: 105 },
    ],
    totalSurtir: 225,
    prioridad: "MEDIA"
  },
]

const totalPiezas = propuesta340.reduce((acc, t) => acc + t.totalSurtir, 0)
const totalTiendas = propuesta340.length

export default function Slide6PDQ340() {
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
              <div className="p-2 bg-[#E31837]/10 rounded-xl">
                <Package size={28} className="text-[#E31837]" />
              </div>
              <span className="text-sm font-semibold text-[#E31837] uppercase tracking-wider">
                Propuesta de Surtido
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 340gr: {totalTiendas} tiendas a surtir
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Detalle de cantidades por tienda y sabor
            </p>
          </div>

          {/* Summary */}
          <div className="flex gap-4">
            <div className="px-5 py-3 bg-[#E31837]/10 rounded-xl border border-[#E31837]/20">
              <p className="text-sm text-gray-600">Total piezas</p>
              <p className="text-3xl font-bold text-[#E31837]">{totalPiezas.toLocaleString()}</p>
            </div>
            <div className="px-5 py-3 bg-gray-100 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600">PDQ completos</p>
              <p className="text-3xl font-bold text-[#1A1A1A]">~{Math.ceil(totalPiezas / 160)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Propuesta Cards */}
      <div className="flex-1 flex gap-6">
        {propuesta340.map((tienda, index) => {
          const isExpanded = expandedTienda === index

          return (
            <div
              key={tienda.codigo}
              className={`flex-1 bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 cursor-pointer ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isExpanded ? "border-[#E31837] shadow-xl" : "border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => setExpandedTienda(isExpanded ? null : index)}
            >
              {/* Header */}
              <div className={`p-5 ${isExpanded ? "bg-[#E31837]/10" : "bg-gray-50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tienda.prioridad === "ALTA"
                      ? "bg-[#E31837] text-white"
                      : "bg-[#F7B500] text-white"
                  }`}>
                    {tienda.prioridad}
                  </span>
                  <span className="text-xs text-gray-400">#{tienda.codigo}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{tienda.tienda}</h3>
              </div>

              {/* Sabores */}
              <div className="p-5 flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                  Detalle por sabor
                </p>
                <div className="space-y-3">
                  {tienda.sabores.map((sabor) => {
                    const colorMap: Record<string, string> = {
                      "SAL": "#F7B500",
                      "FUEGO": "#E31837",
                      "JALAPEÑO": "#27AE60",
                    }
                    const color = colorMap[sabor.nombre] || "#gray"

                    return (
                      <div
                        key={sabor.nombre}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="font-semibold text-gray-800">{sabor.nombre}</span>
                          </div>
                          {sabor.surtir > 0 ? (
                            <span className="px-2 py-1 bg-[#E31837]/10 text-[#E31837] text-sm font-bold rounded-lg">
                              +{sabor.surtir} pzs
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                              OK
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Inventario: {sabor.inv} pzs</span>
                          <span>DOS: {sabor.dos > 500 ? ">500" : sabor.dos}d</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total a surtir:</span>
                  <span className="text-2xl font-bold text-[#E31837]">
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
        className={`mt-6 p-5 bg-gradient-to-r from-[#E31837]/10 to-[#E31837]/5 rounded-2xl border border-[#E31837]/30 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Truck size={28} className="text-[#E31837]" />
            <div>
              <p className="font-bold text-[#1A1A1A]">
                Pedido PDQ 340gr: {totalPiezas.toLocaleString()} piezas en {totalTiendas} tiendas
              </p>
              <p className="text-sm text-gray-600">
                Equivale a ~{Math.ceil(totalPiezas / 160)} PDQ completos (160 pzs c/u)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-[#E31837] text-white rounded-xl font-semibold cursor-pointer hover:bg-[#C41230] transition-colors">
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
