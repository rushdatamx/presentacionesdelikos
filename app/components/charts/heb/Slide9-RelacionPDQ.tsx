"use client"

import { useState, useEffect } from "react"
import { ClipboardList, Package, Calendar, AlertTriangle } from "lucide-react"

// Resumen de PDQs requeridos
const pdqResumen = [
  { presentacion: "PDQ Papa Casera 340gr", pdqs: 2, piezasPorPDQ: 240, totalPiezas: 480, upc: "7502256161779" },
  { presentacion: "PDQ Papa Casera 45gr", pdqs: 2, piezasPorPDQ: 1260, totalPiezas: 2520, upc: "7502256161670" },
]

const totalPDQs = 4
const totalPiezas = 3000

// Tiendas destino por PDQ
const tiendasDestino = [
  {
    pdq: "PDQ 340gr",
    color: "#E31837",
    tiendas: ["MTY ZUAZUA (#2920)"],
  },
  {
    pdq: "PDQ 45gr",
    color: "#F7B500",
    tiendas: ["MAT LAS BRISAS (#2906)", "MTY AZTLAN (#2956)", "REY AEROPUERTO (#2995)", "REY SAN FERNANDO (#9107)"],
  },
]

// Tiendas con inventario pero sin venta (problema de exhibición)
const tiendasSinVenta = [
  { tienda: "MTY BUENA VISTA", codigo: "#9104", pdq: "340gr" },
  { tienda: "SAL SATELITE", codigo: "#2938", pdq: "340gr" },
  { tienda: "MTY AZTLAN", codigo: "#2956", pdq: "340gr" },
]

export default function Slide9RelacionPDQ() {
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
          <div className="p-1.5 bg-[#E31837]/10 rounded-lg">
            <ClipboardList size={22} className="text-[#E31837]" />
          </div>
          <span className="text-xs font-semibold text-[#E31837] uppercase tracking-wider">
            Solicitud de Orden de Compra
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
          Resumen de PDQs requeridos
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Con base en sell-out, estas tiendas tienen buena rotación e inventario por debajo de 30 días de cobertura
        </p>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Tabla resumen PDQs */}
          <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-[#E31837]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">PDQs a solicitar</h3>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="text-left py-2 px-3 rounded-l-lg font-semibold">Presentación</th>
                  <th className="text-center py-2 px-3 font-semibold">PDQs</th>
                  <th className="text-center py-2 px-3 font-semibold">Piezas/PDQ</th>
                  <th className="text-center py-2 px-3 rounded-r-lg font-semibold">Total piezas</th>
                </tr>
              </thead>
              <tbody>
                {pdqResumen.map((row, index) => (
                  <tr
                    key={row.upc}
                    className={`border-b border-gray-100 transition-all duration-300 ${
                      isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 80}ms` }}
                  >
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-[#1A1A1A]">{row.presentacion}</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">UPC: {row.upc}</p>
                    </td>
                    <td className="text-center py-2.5 px-3">
                      <span className="text-lg font-bold text-[#E31837]">{row.pdqs}</span>
                    </td>
                    <td className="text-center py-2.5 px-3">
                      <span className="text-sm text-gray-600">{row.piezasPorPDQ.toLocaleString()}</span>
                    </td>
                    <td className="text-center py-2.5 px-3">
                      <span className="font-semibold text-[#1A1A1A]">{row.totalPiezas.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
                {/* Total */}
                <tr className="bg-[#E31837]/5 font-bold">
                  <td className="py-2.5 px-3 text-[#1A1A1A]">Total</td>
                  <td className="text-center py-2.5 px-3 text-lg text-[#E31837]">{totalPDQs}</td>
                  <td className="text-center py-2.5 px-3"></td>
                  <td className="text-center py-2.5 px-3 text-[#E31837]">{totalPiezas.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tiendas destino */}
          <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200">
            <h3 className="font-bold text-sm text-[#1A1A1A] mb-3">Tiendas destino</h3>
            <div className="space-y-3">
              {tiendasDestino.map((grupo, index) => (
                <div
                  key={grupo.pdq}
                  className={`transition-all duration-300 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${450 + index * 80}ms` }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: grupo.color }} />
                    <span className="text-xs font-bold text-[#1A1A1A]">{grupo.pdq}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-4">
                    {grupo.tiendas.map((tienda) => (
                      <span
                        key={tienda}
                        className="px-2.5 py-1 bg-white rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700"
                      >
                        {tienda}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className={`w-[340px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="h-full flex flex-col gap-3">
            {/* Gran Total */}
            <div className="p-5 bg-gradient-to-br from-[#E31837]/10 to-[#E31837]/5 rounded-xl border border-[#E31837]/20 text-center">
              <p className="text-xs text-gray-600 mb-1">Total Orden de Compra</p>
              <p className="text-5xl font-bold text-[#E31837]">{totalPDQs}</p>
              <p className="text-lg font-semibold text-[#1A1A1A] mt-1">PDQs</p>
              <p className="text-sm text-gray-500">{totalPiezas.toLocaleString()} piezas</p>
            </div>

            {/* Badge */}
            <div
              className={`flex items-center gap-2 p-3 bg-[#27AE60]/10 rounded-xl border border-[#27AE60]/20 transition-all duration-500 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Calendar size={16} className="text-[#27AE60]" />
              <div>
                <span className="px-2 py-0.5 bg-[#27AE60] text-white text-[10px] font-bold rounded">
                  SOLICITAR PRÓXIMA SEMANA
                </span>
                <p className="text-[10px] text-gray-500 mt-1">Enviar OC a comprador MI TIENDA</p>
              </div>
            </div>

            {/* Tiendas con inventario sin venta */}
            <div
              className={`flex-1 p-3 bg-[#9333EA]/5 rounded-xl border border-[#9333EA]/20 transition-all duration-500 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-[#9333EA]" />
                <h4 className="font-bold text-[11px] text-[#1A1A1A]">Inventario sin venta registrada</h4>
              </div>
              <p className="text-[10px] text-gray-600 mb-2">
                Estas tiendas tienen inventario en sistema pero no se ha registrado venta. El producto podría no estar exhibido en piso.
              </p>
              <div className="space-y-1">
                {tiendasSinVenta.map((t) => (
                  <div key={t.codigo} className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-[#9333EA]/15">
                    <div className="w-1 h-4 rounded-full bg-[#9333EA]" />
                    <span className="text-[10px] font-semibold text-[#1A1A1A]">{t.tienda}</span>
                    <span className="text-[9px] text-gray-400">({t.codigo})</span>
                    <span className="ml-auto text-[9px] text-[#9333EA] font-medium">{t.pdq}</span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-gray-500 mt-2">
                Proponemos revisar la exhibición juntos en estas tiendas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          Fuente: MI TIENDA al 15/Feb/2026 | PDQ 340gr = 240 pzs (80×3 sabores) | PDQ 45gr = 1,260 pzs (420×3 sabores)
        </p>
      </div>
    </div>
  )
}
