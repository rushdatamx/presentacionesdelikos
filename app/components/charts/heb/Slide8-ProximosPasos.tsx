"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Trophy, Package, CheckCircle, Clock, TrendingDown, Eye } from "lucide-react"

// STOCK BAJO: Alta rotación, poco inventario - necesitan resurtido
const tiendasStockBajo = [
  { tienda: "REY RIO BRAVO", codigo: "2972", pdq: "45gr", dosMin: 4 },
  { tienda: "REY SAN FERNANDO", codigo: "9107", pdq: "45gr", dosMin: 3 },
  { tienda: "REY AEROPUERTO", codigo: "2995", pdq: "45gr", dosMin: 7 },
]

// PROBLEMA DE ANAQUEL: Hay inventario pero 0 venta - verificar exhibición
const tiendasProblemaAnaquel = [
  { tienda: "MTY AZTLAN", codigo: "2956", pdq: "45gr", inv: 449 },
  { tienda: "MTY BUENA VISTA", codigo: "9104", pdq: "340gr", inv: 160 },
  { tienda: "SAL SATELITE", codigo: "2938", pdq: "340gr", inv: 160 },
  { tienda: "MTY ZUAZUA", codigo: "2920", pdq: "340gr", inv: 82 },
]

// Top 5 tiendas con mejor rotación - revisar si también necesitan surtido
const topTiendas = [
  { tienda: "NVO REVOLUCION", codigo: "2948", unidades: 8374, dosMin45: 44, dosMin340: 124, necesitaSurtir: false },
  { tienda: "MTY HUINALA", codigo: "2994", unidades: 8128, dosMin45: 26, dosMin340: 25, necesitaSurtir: true },
  { tienda: "MTY CIUDADELA", codigo: "2990", unidades: 7856, dosMin45: 35, dosMin340: 52, necesitaSurtir: false },
  { tienda: "REY SAN FERNANDO", codigo: "9107", unidades: 7919, dosMin45: 3, dosMin340: 114, necesitaSurtir: true },
  { tienda: "MTY ZUAZUA", codigo: "2920", unidades: 7382, dosMin45: 27, dosMin340: 0, necesitaSurtir: true },
]

export default function Slide8ProximosPasos() {
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
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-[#27AE60]/10 rounded-lg">
            <CheckCircle size={22} className="text-[#27AE60]" />
          </div>
          <span className="text-xs font-semibold text-[#27AE60] uppercase tracking-wider">
            Resumen y Acción
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
          Tiendas que requieren surtido
        </h1>
      </div>

      {/* Main Content - Two Sections */}
      <div
        className={`flex-1 flex gap-3 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left Column - Two subsections */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Stock Bajo */}
          <div className="flex-1 p-3 bg-[#E31837]/5 rounded-xl border border-[#E31837]/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-[#E31837]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">
                Stock Bajo ({tiendasStockBajo.length} tiendas)
              </h3>
              <span className="ml-auto px-2 py-0.5 bg-[#E31837] text-white text-[9px] font-bold rounded">
                RESURTIR
              </span>
            </div>

            <div className="space-y-1">
              {tiendasStockBajo.map((tienda, index) => (
                <div
                  key={tienda.codigo}
                  className={`p-1.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between transition-all duration-300 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-5 rounded-full ${tienda.dosMin < 7 ? "bg-[#E31837]" : "bg-[#F7B500]"}`} />
                    <div>
                      <p className="font-semibold text-xs text-[#1A1A1A]">{tienda.tienda}</p>
                      <p className="text-[9px] text-gray-400">PDQ {tienda.pdq}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${tienda.dosMin < 7 ? "text-[#E31837]" : "text-[#F7B500]"}`}>
                    {tienda.dosMin}d
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Problema de Anaquel */}
          <div className="flex-1 p-3 bg-[#9333EA]/5 rounded-xl border border-[#9333EA]/20">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#9333EA]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">
                Problema de Anaquel ({tiendasProblemaAnaquel.length} tiendas)
              </h3>
              <span className="ml-auto px-2 py-0.5 bg-[#9333EA] text-white text-[9px] font-bold rounded">
                VERIFICAR
              </span>
            </div>

            <div className="space-y-1">
              {tiendasProblemaAnaquel.map((tienda, index) => (
                <div
                  key={tienda.codigo}
                  className={`p-1.5 bg-white rounded-lg border border-[#9333EA]/20 flex items-center justify-between transition-all duration-300 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${450 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-[#9333EA]" />
                    <div>
                      <p className="font-semibold text-xs text-[#1A1A1A]">{tienda.tienda}</p>
                      <p className="text-[9px] text-gray-400">PDQ {tienda.pdq} • Inv: {tienda.inv} pzs</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-[#9333EA]">0 venta</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Top Tiendas con DOS */}
        <div className="w-[480px]">
          <div className="p-4 bg-[#F7B500]/5 rounded-xl border border-[#F7B500]/20 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={18} className="text-[#F7B500]" />
              <h3 className="font-bold text-[#1A1A1A]">
                Top 5 tiendas - ¿También surtir?
              </h3>
            </div>

            <div className="space-y-1.5">
              {topTiendas.map((tienda, index) => (
                <div
                  key={tienda.codigo}
                  className={`p-2 bg-white rounded-lg border ${tienda.necesitaSurtir ? "border-[#F7B500]" : "border-gray-200"} transition-all duration-300 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        index === 0 ? "bg-[#F7B500] text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#1A1A1A]">{tienda.tienda}</p>
                        <p className="text-[10px] text-gray-400">{tienda.unidades.toLocaleString()} u</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-[9px] text-gray-400">45gr</p>
                        <p className={`font-bold text-sm ${tienda.dosMin45 < 14 ? "text-[#E31837]" : "text-[#27AE60]"}`}>
                          {tienda.dosMin45}d
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] text-gray-400">340gr</p>
                        <p className={`font-bold text-sm ${tienda.dosMin340 < 14 ? "text-[#E31837]" : "text-[#27AE60]"}`}>
                          {tienda.dosMin340}d
                        </p>
                      </div>
                      {tienda.necesitaSurtir ? (
                        <span className="px-1.5 py-0.5 bg-[#F7B500] text-white text-[9px] font-bold rounded">
                          CONSIDERAR
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-[#27AE60]/10 text-[#27AE60] text-[9px] font-bold rounded">
                          OK
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 bg-white rounded-lg border border-[#F7B500]/30">
              <p className="text-xs text-gray-600">
                <span className="font-bold text-[#F7B500]">3 de las top 5</span> tiendas tienen DOS bajo.
                Considera incluirlas para evitar quiebres.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div
        className={`mt-3 p-3 bg-gradient-to-r from-[#27AE60]/10 to-[#27AE60]/5 rounded-xl border border-[#27AE60]/30 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-[#27AE60]" />
            <div>
              <p className="font-bold text-sm text-[#1A1A1A]">
                Próximos pasos
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span><span className="font-semibold text-[#E31837]">{tiendasStockBajo.length}</span> tiendas → Resurtir PDQ</span>
                <span className="text-gray-300">|</span>
                <span><span className="font-semibold text-[#9333EA]">{tiendasProblemaAnaquel.length}</span> tiendas → Visitar y verificar anaquel</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={14} />
            <span>Siguiente revisión: 2 semanas</span>
          </div>
        </div>
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
