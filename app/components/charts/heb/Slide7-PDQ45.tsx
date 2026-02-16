"use client"

import { useState, useEffect } from "react"
import { Package, AlertTriangle, CheckCircle, TrendingDown, Eye } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Estado de inventario PDQ 45gr por tienda
// Excluye CAT MONTERREY (2160)

// Tiendas con STOCK BAJO (alta rotación, poco inventario)
const tiendasStockBajo = [
  {
    tienda: "MAT LAS BRISAS",
    codigo: "2906",
    sabores: [
      { nombre: "NATURAL", inv: 335, dos: 13, ventaDiaria: 26 },
      { nombre: "FUEGO", inv: 317, dos: 14, ventaDiaria: 23, ok: true },
      { nombre: "JALAPEÑO", inv: 352, dos: 19, ventaDiaria: 19, ok: true },
    ],
  },
  {
    tienda: "REY AEROPUERTO",
    codigo: "2995",
    sabores: [
      { nombre: "NATURAL", inv: 42, dos: 5, ventaDiaria: 8 },
      { nombre: "FUEGO", inv: 113, dos: 21, ventaDiaria: 5, ok: true },
      { nombre: "JALAPEÑO", inv: 44, dos: 6, ventaDiaria: 7 },
    ],
  },
  {
    tienda: "REY SAN FERNANDO",
    codigo: "9107",
    sabores: [
      { nombre: "NATURAL", inv: 188, dos: 14, ventaDiaria: 13, ok: true },
      { nombre: "FUEGO", inv: 142, dos: 13, ventaDiaria: 11 },
      { nombre: "JALAPEÑO", inv: 117, dos: 11, ventaDiaria: 11 },
    ],
  },
]

// Tienda con PROBLEMA DE ANAQUEL (inventario pero 0 venta)
const tiendaProblemaAnaquel = {
  tienda: "MTY AZTLAN",
  codigo: "2956",
  sabores: [
    { nombre: "NATURAL", inv: 450, dos: 280, ok: true },
    { nombre: "FUEGO", inv: 449, dos: 0, problemaAnaquel: true },
    { nombre: "JALAPEÑO", inv: 464, dos: 419, ok: true },
  ],
}

const colorMap: Record<string, string> = {
  "NATURAL": "#F7B500",
  "FUEGO": "#E31837",
  "JALAPEÑO": "#27AE60",
}

export default function Slide7PDQ45() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-white p-8 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-3 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-[#F7B500]/10 rounded-lg">
                <Package size={22} className="text-[#F7B500]" />
              </div>
              <span className="text-xs font-semibold text-[#F7B500] uppercase tracking-wider">
                Estado de Inventario
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 45gr: 4 tiendas requieren atención
            </h1>
            <p className="text-base text-gray-500 mt-1">
              3 con stock bajo + 1 con problema de anaquel
            </p>
          </div>

          {/* Summary */}
          <div className="flex gap-2">
            <div className="px-3 py-2 bg-[#E31837]/10 rounded-lg border border-[#E31837]/20">
              <p className="text-[10px] text-gray-600">Stock bajo</p>
              <p className="text-xl font-bold text-[#E31837]">3</p>
            </div>
            <div className="px-3 py-2 bg-[#9333EA]/10 rounded-lg border border-[#9333EA]/20">
              <p className="text-[10px] text-gray-600">Anaquel</p>
              <p className="text-xl font-bold text-[#9333EA]">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-3">
        {/* Stock Bajo Cards */}
        {tiendasStockBajo.map((tienda, index) => (
          <div
            key={tienda.codigo}
            className={`flex-1 bg-white rounded-xl border-2 border-[#E31837]/40 overflow-hidden transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } shadow-md`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {/* Header */}
            <div className="p-2 bg-[#E31837]/10">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1">
                  <TrendingDown size={12} className="text-[#E31837]" />
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E31837] text-white">
                    STOCK BAJO
                  </span>
                </div>
                <span className="text-[9px] text-gray-400">#{tienda.codigo}</span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">{tienda.tienda}</h3>
            </div>

            {/* Sabores */}
            <div className="p-2 flex-1">
              <div className="space-y-1">
                {tienda.sabores.map((sabor) => {
                  const color = colorMap[sabor.nombre] || "#gray"
                  const isOk = 'ok' in sabor && sabor.ok

                  return (
                    <div
                      key={sabor.nombre}
                      className={`p-1.5 rounded border ${isOk ? "bg-gray-50 border-gray-200" : "bg-red-50 border-red-200"}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="font-medium text-[10px] text-gray-800">{sabor.nombre}</span>
                        </div>
                        {isOk ? (
                          <span className="px-1 py-0.5 bg-[#27AE60] text-white text-[8px] font-bold rounded">OK</span>
                        ) : (
                          <span className="px-1 py-0.5 bg-[#E31837] text-white text-[8px] font-bold rounded">SURTIR</span>
                        )}
                      </div>
                      <div className="flex justify-between text-[8px] text-gray-500">
                        <span>Inv: {sabor.inv}</span>
                        {'ventaDiaria' in sabor && !isOk && (
                          <span className="text-[#E31837]">{sabor.ventaDiaria} pzs/día</span>
                        )}
                        <span className={isOk ? "" : "text-[#E31837] font-semibold"}>{sabor.dos}d</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-1.5 border-t border-red-200 bg-red-50">
              <div className="flex items-center justify-center gap-1">
                <AlertTriangle size={10} className="text-[#E31837]" />
                <span className="font-bold text-[#E31837] text-[10px]">Resurtir</span>
              </div>
            </div>
          </div>
        ))}

        {/* Problema Anaquel Card */}
        <div
          className={`flex-1 bg-white rounded-xl border-2 border-[#9333EA]/40 overflow-hidden transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } shadow-md`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Header */}
          <div className="p-2 bg-[#9333EA]/10">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <Eye size={12} className="text-[#9333EA]" />
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#9333EA] text-white">
                  ANAQUEL
                </span>
              </div>
              <span className="text-[9px] text-gray-400">#{tiendaProblemaAnaquel.codigo}</span>
            </div>
            <h3 className="text-sm font-bold text-[#1A1A1A]">{tiendaProblemaAnaquel.tienda}</h3>
          </div>

          {/* Sabores */}
          <div className="p-2 flex-1">
            <div className="space-y-1">
              {tiendaProblemaAnaquel.sabores.map((sabor) => {
                const color = colorMap[sabor.nombre] || "#gray"
                const isProblema = 'problemaAnaquel' in sabor && sabor.problemaAnaquel

                return (
                  <div
                    key={sabor.nombre}
                    className={`p-1.5 rounded border ${isProblema ? "bg-[#9333EA]/5 border-[#9333EA]/30" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="font-medium text-[10px] text-gray-800">{sabor.nombre}</span>
                      </div>
                      {isProblema ? (
                        <span className="px-1 py-0.5 bg-[#9333EA] text-white text-[8px] font-bold rounded">0 VENTA</span>
                      ) : (
                        <span className="px-1 py-0.5 bg-[#27AE60] text-white text-[8px] font-bold rounded">OK</span>
                      )}
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500">
                      <span>Inv: {sabor.inv}</span>
                      {isProblema ? (
                        <span className="text-[#9333EA] font-semibold">Sin venta</span>
                      ) : (
                        <span>DOS: {sabor.dos > 500 ? ">500" : sabor.dos}d</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-1.5 border-t border-[#9333EA]/20 bg-[#9333EA]/5">
            <div className="flex items-center justify-center gap-1">
              <Eye size={10} className="text-[#9333EA]" />
              <span className="font-bold text-[#9333EA] text-[10px]">Verificar exhibición</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          Fuente: Inventario MI TIENDA al 15/Feb/2026 (S15 FY2026) | DOS = Días de cobertura | Excluye CAT Monterrey
        </p>
      </div>
    </div>
  )
}
