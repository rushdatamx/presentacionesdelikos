"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Trophy, Package, CheckCircle, Clock } from "lucide-react"

// Tiendas que necesitan surtido (combinado PDQ 340gr + 45gr)
const tiendasASurtir = [
  { tienda: "REY RIO BRAVO", codigo: "2972", pdq: "45gr", dosMin: 4 },
  { tienda: "REY SAN FERNANDO", codigo: "9107", pdq: "45gr", dosMin: 3 },
  { tienda: "REY AEROPUERTO", codigo: "2995", pdq: "45gr", dosMin: 7 },
  { tienda: "MTY AZTLAN", codigo: "2956", pdq: "45gr", dosMin: 0 },
  { tienda: "MTY BUENA VISTA", codigo: "9104", pdq: "340gr", dosMin: 0 },
  { tienda: "SAL SATELITE", codigo: "2938", pdq: "340gr", dosMin: 0 },
  { tienda: "MTY ZUAZUA", codigo: "2920", pdq: "340gr", dosMin: 0 },
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
        className={`flex-1 flex gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left - Tiendas a Surtir */}
        <div className="flex-1">
          <div className="p-4 bg-[#E31837]/5 rounded-xl border border-[#E31837]/20 h-full">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-[#E31837]" />
              <h3 className="font-bold text-[#1A1A1A]">
                7 tiendas con inventario bajo
              </h3>
            </div>

            <div className="space-y-1.5">
              {tiendasASurtir.map((tienda, index) => (
                <div
                  key={tienda.codigo}
                  className={`p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-between transition-all duration-300 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-6 rounded-full ${tienda.dosMin < 7 ? "bg-[#E31837]" : "bg-[#F7B500]"}`} />
                    <div>
                      <p className="font-semibold text-sm text-[#1A1A1A]">{tienda.tienda}</p>
                      <p className="text-[10px] text-gray-400">PDQ {tienda.pdq}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className={`text-base font-bold ${tienda.dosMin < 7 ? "text-[#E31837]" : "text-[#F7B500]"}`}>
                        {tienda.dosMin}d
                      </p>
                      <p className="text-[9px] text-gray-400">DOS</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#E31837] text-white text-[10px] font-bold rounded">
                      SURTIR
                    </span>
                  </div>
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
        className={`mt-4 p-3 bg-gradient-to-r from-[#27AE60]/10 to-[#27AE60]/5 rounded-xl border border-[#27AE60]/30 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={22} className="text-[#27AE60]" />
            <div>
              <p className="font-bold text-[#1A1A1A]">
                Acción: Surtir las 7 tiendas identificadas
              </p>
              <p className="text-xs text-gray-600">
                PDQ 340gr: 3 tiendas | PDQ 45gr: 4 tiendas
              </p>
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
