"use client"

import { useState, useEffect } from "react"
import { Target, CheckCircle, Package, Truck, Calendar, ArrowRight, Handshake } from "lucide-react"

// Resumen de la propuesta completa

const resumenPropuesta = {
  pdq340: {
    tiendas: 3,
    piezas: 1185,
    pdqs: 8, // ~1185/160
  },
  pdq45: {
    tiendas: 4,
    piezas: 2368,
    pdqs: 33, // ~2368/72
  },
}

const totalTiendas = resumenPropuesta.pdq340.tiendas + resumenPropuesta.pdq45.tiendas
const totalPiezas = resumenPropuesta.pdq340.piezas + resumenPropuesta.pdq45.piezas

export default function Slide8ProximosPasos() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-[#27AE60]/5 to-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-8 text-center transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-[#27AE60]/10 rounded-2xl">
            <Handshake size={36} className="text-[#27AE60]" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#1A1A1A] tracking-tight">
          Siguiente Paso
        </h1>
        <p className="text-xl text-gray-500 mt-3">
          Propuesta de pedido para mantener disponibilidad en tienda
        </p>
      </div>

      {/* Main Proposal */}
      <div
        className={`flex-1 flex gap-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left - Numbers */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="p-8 bg-white rounded-3xl border-2 border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-500 mb-6 uppercase tracking-wider">
              Resumen del Pedido
            </h3>

            {/* PDQ 340gr */}
            <div className="p-5 bg-[#E31837]/5 rounded-2xl border border-[#E31837]/20 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-[#E31837]" />
                  <span className="font-bold text-lg text-[#1A1A1A]">PDQ 340gr</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#E31837]">
                    {resumenPropuesta.pdq340.piezas.toLocaleString()} pzs
                  </p>
                  <p className="text-sm text-gray-500">
                    ~{resumenPropuesta.pdq340.pdqs} PDQ en {resumenPropuesta.pdq340.tiendas} tiendas
                  </p>
                </div>
              </div>
            </div>

            {/* PDQ 45gr */}
            <div className="p-5 bg-[#F7B500]/5 rounded-2xl border border-[#F7B500]/20 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-[#F7B500]" />
                  <span className="font-bold text-lg text-[#1A1A1A]">PDQ 45gr</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#F7B500]">
                    {resumenPropuesta.pdq45.piezas.toLocaleString()} pzs
                  </p>
                  <p className="text-sm text-gray-500">
                    ~{resumenPropuesta.pdq45.pdqs} PDQ en {resumenPropuesta.pdq45.tiendas} tiendas
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-5 bg-[#27AE60]/10 rounded-2xl border-2 border-[#27AE60]/30">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-[#1A1A1A]">Total del pedido</span>
                <div className="text-right">
                  <p className="text-4xl font-bold text-[#27AE60]">
                    {totalPiezas.toLocaleString()} pzs
                  </p>
                  <p className="text-sm text-gray-500">
                    {totalTiendas} tiendas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Action */}
        <div className="w-[450px] flex flex-col justify-center">
          <div className="space-y-4">
            {/* Step 1 */}
            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-md transition-all duration-500 hover:border-[#27AE60] hover:shadow-lg ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#27AE60] rounded-xl flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Aprobar pedido</p>
                  <p className="text-gray-500 mt-1">
                    Confirmar las cantidades propuestas para cada tienda
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-md transition-all duration-500 hover:border-[#27AE60] hover:shadow-lg ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Programar envío</p>
                  <p className="text-gray-500 mt-1">
                    DELIKOS coordina entrega en las 7 tiendas identificadas
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-md transition-all duration-500 hover:border-[#27AE60] hover:shadow-lg ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-lg">Seguimiento</p>
                  <p className="text-gray-500 mt-1">
                    Revisión en 2 semanas para validar rotación y ajustar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`mt-8 p-6 bg-[#27AE60] rounded-2xl transition-all duration-700 hover:shadow-2xl cursor-pointer ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CheckCircle size={32} className="text-white" />
            <div>
              <p className="font-bold text-white text-xl">
                ¿Aprobamos este pedido?
              </p>
              <p className="text-white/80">
                {totalPiezas.toLocaleString()} piezas totales para {totalTiendas} tiendas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white text-[#27AE60] rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
            <span>Sí, aprobar</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Propuesta basada en inventario MI TIENDA al 09/Feb/2026 | Cantidades calculadas para 30 días de cobertura
        </p>
      </div>
    </div>
  )
}
