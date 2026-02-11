"use client"

import { useState, useEffect } from "react"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Estado de inventario PDQ 340gr por tienda
// Excluye CAT MONTERREY (2160)

const tiendas340 = [
  {
    tienda: "MTY BUENA VISTA",
    codigo: "9104",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 160, dos: 0, necesitaSurtir: true },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
  {
    tienda: "SAL SATELITE",
    codigo: "2938",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 160, dos: 0, necesitaSurtir: true },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
  {
    tienda: "MTY ZUAZUA",
    codigo: "2920",
    sabores: [
      { nombre: "SAL", inv: 82, dos: 0, necesitaSurtir: true },
      { nombre: "FUEGO", inv: 84, dos: 785, necesitaSurtir: false },
      { nombre: "JALAPEÑO", inv: 80, dos: 0, necesitaSurtir: true },
    ],
    necesitaSurtir: true
  },
]

const tiendasASurtir = tiendas340.filter(t => t.necesitaSurtir).length

export default function Slide6PDQ340() {
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
              <div className="p-2 bg-[#E31837]/10 rounded-xl">
                <Package size={28} className="text-[#E31837]" />
              </div>
              <span className="text-sm font-semibold text-[#E31837] uppercase tracking-wider">
                Estado de Inventario
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 340gr: {tiendasASurtir} tiendas necesitan surtido
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Inventario actual y días de cobertura por tienda
            </p>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-[#E31837]/10 rounded-xl border border-[#E31837]/20">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="text-[#E31837]" />
              <div>
                <p className="text-sm text-gray-600">Tiendas a surtir</p>
                <p className="text-3xl font-bold text-[#E31837]">{tiendasASurtir}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiendas Cards */}
      <div className="flex-1 flex gap-6">
        {tiendas340.map((tienda, index) => (
          <div
            key={tienda.codigo}
            className={`flex-1 bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${tienda.necesitaSurtir ? "border-[#E31837]/50" : "border-gray-200"} shadow-md`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {/* Header */}
            <div className={`p-5 ${tienda.necesitaSurtir ? "bg-[#E31837]/10" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                {tienda.necesitaSurtir ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E31837] text-white">
                    SURTIR
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#27AE60] text-white">
                    OK
                  </span>
                )}
                <span className="text-xs text-gray-400">#{tienda.codigo}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">{tienda.tienda}</h3>
            </div>

            {/* Sabores */}
            <div className="p-5 flex-1">
              <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                Por sabor
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
                      className={`p-3 rounded-xl border ${sabor.necesitaSurtir ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-semibold text-gray-800">{sabor.nombre}</span>
                        </div>
                        {sabor.necesitaSurtir ? (
                          <span className="px-3 py-1 bg-[#E31837] text-white text-sm font-bold rounded-lg">
                            SURTIR
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-[#27AE60] text-white text-sm font-bold rounded-lg">
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
            <div className={`p-4 border-t ${tienda.necesitaSurtir ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center justify-center gap-2">
                {tienda.necesitaSurtir ? (
                  <>
                    <AlertTriangle size={18} className="text-[#E31837]" />
                    <span className="font-bold text-[#E31837]">Requiere surtido</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} className="text-[#27AE60]" />
                    <span className="font-bold text-[#27AE60]">Inventario OK</span>
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
