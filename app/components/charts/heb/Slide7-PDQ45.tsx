"use client"

import { useState, useEffect } from "react"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Estado de inventario PDQ 45gr por tienda
// Excluye CAT MONTERREY (2160)

const tiendas45 = [
  {
    tienda: "REY RIO BRAVO",
    codigo: "2972",
    sabores: [
      { nombre: "NATURAL", inv: 120, dos: 11, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 80, dos: 7, necesitaSurtir: true },
      { nombre: "JALAPEÑO", inv: 66, dos: 4, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
  {
    tienda: "REY SAN FERNANDO",
    codigo: "9107",
    sabores: [
      { nombre: "NATURAL", inv: 50, dos: 3, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 171, dos: 14, necesitaSurtir: false },
      { nombre: "JALAPEÑO", inv: 105, dos: 8, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
  {
    tienda: "REY AEROPUERTO",
    codigo: "2995",
    sabores: [
      { nombre: "NATURAL", inv: 66, dos: 7, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 123, dos: 19, necesitaSurtir: false },
      { nombre: "JALAPEÑO", inv: 77, dos: 9, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
  {
    tienda: "MTY AZTLAN",
    codigo: "2956",
    sabores: [
      { nombre: "NATURAL", inv: 457, dos: 337, necesitaSurtir: false },
      { nombre: "FUEGO", inv: 449, dos: 0, necesitaSurtir: true },
      { nombre: "JALAPEÑO", inv: 486, dos: 1514, necesitaSurtir: false },
    ],
    necesitaSurtir: true
  },
]

const tiendasASurtir = tiendas45.filter(t => t.necesitaSurtir).length

export default function Slide7PDQ45() {
  const [isLoaded, setIsLoaded] = useState(false)

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
                Estado de Inventario
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 45gr: {tiendasASurtir} tiendas necesitan surtido
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Inventario actual y días de cobertura por tienda
            </p>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-[#F7B500]/10 rounded-xl border border-[#F7B500]/20">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="text-[#F7B500]" />
              <div>
                <p className="text-sm text-gray-600">Tiendas a surtir</p>
                <p className="text-3xl font-bold text-[#F7B500]">{tiendasASurtir}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiendas Cards */}
      <div className="flex-1 flex gap-4">
        {tiendas45.map((tienda, index) => (
          <div
            key={tienda.codigo}
            className={`flex-1 bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${tienda.necesitaSurtir ? "border-[#F7B500]/50" : "border-gray-200"} shadow-md`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {/* Header */}
            <div className={`p-4 ${tienda.necesitaSurtir ? "bg-[#F7B500]/10" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                {tienda.necesitaSurtir ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F7B500] text-white">
                    SURTIR
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#27AE60] text-white">
                    OK
                  </span>
                )}
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
                      className={`p-2 rounded-lg border ${sabor.necesitaSurtir ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-medium text-sm text-gray-800">{sabor.nombre}</span>
                        </div>
                        {sabor.necesitaSurtir ? (
                          <span className="px-2 py-0.5 bg-[#F7B500] text-white text-xs font-bold rounded">
                            SURTIR
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#27AE60] text-white text-xs font-bold rounded">
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
            <div className={`p-3 border-t ${tienda.necesitaSurtir ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center justify-center gap-2">
                {tienda.necesitaSurtir ? (
                  <>
                    <AlertTriangle size={16} className="text-[#F7B500]" />
                    <span className="font-bold text-[#F7B500] text-sm">Requiere surtido</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="text-[#27AE60]" />
                    <span className="font-bold text-[#27AE60] text-sm">Inventario OK</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Fuente: Inventario MI TIENDA al 09/Feb/2026 | DOS = Días de cobertura | Excluye CAT Monterrey
        </p>
      </div>
    </div>
  )
}
