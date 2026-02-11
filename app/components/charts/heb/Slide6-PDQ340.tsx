"use client"

import { useState, useEffect } from "react"
import { Package, AlertTriangle, CheckCircle, Eye } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Estado de inventario PDQ 340gr por tienda
// Excluye CAT MONTERREY (2160)

// Todas las tiendas 340gr tienen DOS=0 con inventario = PROBLEMA DE ANAQUEL
const tiendas340 = [
  {
    tienda: "MTY BUENA VISTA",
    codigo: "9104",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, problemaAnaquel: true },
      { nombre: "FUEGO", inv: 160, dos: 0, problemaAnaquel: true },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, problemaAnaquel: true },
    ],
    problemaAnaquel: true
  },
  {
    tienda: "SAL SATELITE",
    codigo: "2938",
    sabores: [
      { nombre: "SAL", inv: 160, dos: 0, problemaAnaquel: true },
      { nombre: "FUEGO", inv: 160, dos: 0, problemaAnaquel: true },
      { nombre: "JALAPEÑO", inv: 160, dos: 0, problemaAnaquel: true },
    ],
    problemaAnaquel: true
  },
  {
    tienda: "MTY ZUAZUA",
    codigo: "2920",
    sabores: [
      { nombre: "SAL", inv: 82, dos: 0, problemaAnaquel: true },
      { nombre: "FUEGO", inv: 84, dos: 785, problemaAnaquel: false },
      { nombre: "JALAPEÑO", inv: 80, dos: 0, problemaAnaquel: true },
    ],
    problemaAnaquel: true
  },
]

const tiendasProblemaAnaquel = tiendas340.filter(t => t.problemaAnaquel).length

export default function Slide6PDQ340() {
  const [isLoaded, setIsLoaded] = useState(false)

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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-[#9333EA]/10 rounded-lg">
                <Eye size={22} className="text-[#9333EA]" />
              </div>
              <span className="text-xs font-semibold text-[#9333EA] uppercase tracking-wider">
                Problema de Anaquel
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 340gr: {tiendasProblemaAnaquel} tiendas con producto no exhibido
            </h1>
            <p className="text-base text-gray-500 mt-1">
              Hay inventario pero 0 venta = producto en bodega, no en piso
            </p>
          </div>

          {/* Summary */}
          <div className="px-4 py-3 bg-[#9333EA]/10 rounded-lg border border-[#9333EA]/20">
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-[#9333EA]" />
              <div>
                <p className="text-xs text-gray-600">Verificar en tienda</p>
                <p className="text-2xl font-bold text-[#9333EA]">{tiendasProblemaAnaquel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiendas Cards */}
      <div className="flex-1 flex gap-4">
        {tiendas340.map((tienda, index) => (
          <div
            key={tienda.codigo}
            className={`flex-1 bg-white rounded-xl border-2 overflow-hidden transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } border-[#9333EA]/50 shadow-md`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {/* Header */}
            <div className="p-3 bg-[#9333EA]/10">
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9333EA] text-white">
                  VERIFICAR
                </span>
                <span className="text-[10px] text-gray-400">#{tienda.codigo}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">{tienda.tienda}</h3>
            </div>

            {/* Sabores */}
            <div className="p-3 flex-1">
              <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Por sabor
              </p>
              <div className="space-y-2">
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
                      className={`p-2 rounded-lg border ${sabor.problemaAnaquel ? "bg-[#9333EA]/5 border-[#9333EA]/30" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-semibold text-sm text-gray-800">{sabor.nombre}</span>
                        </div>
                        {sabor.problemaAnaquel ? (
                          <span className="px-2 py-0.5 bg-[#9333EA] text-white text-[10px] font-bold rounded">
                            0 VENTA
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#27AE60] text-white text-[10px] font-bold rounded">
                            OK
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500">
                        <span>Inv: {sabor.inv} pzs</span>
                        {sabor.problemaAnaquel ? (
                          <span className="text-[#9333EA] font-semibold">Venta: 0</span>
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
            <div className="p-2 border-t border-[#9333EA]/20 bg-[#9333EA]/5">
              <div className="flex items-center justify-center gap-1.5">
                <Eye size={14} className="text-[#9333EA]" />
                <span className="font-bold text-sm text-[#9333EA]">Verificar exhibición</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div
        className={`mt-3 p-3 bg-[#9333EA]/5 rounded-lg border border-[#9333EA]/20 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <p className="text-xs text-gray-700">
          <span className="font-bold text-[#9333EA]">¿Por qué 0 venta con inventario?</span> El producto llegó a la tienda pero probablemente está en bodega.
          <span className="font-semibold"> Acción:</span> Visitar tienda y verificar si el PDQ está montado y visible en piso de venta.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          Fuente: Inventario MI TIENDA al 09/Feb/2026 | DOS = Días de cobertura | Excluye CAT Monterrey
        </p>
      </div>
    </div>
  )
}
