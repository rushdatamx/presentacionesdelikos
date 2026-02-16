"use client"

import { useState, useEffect } from "react"
import { ClipboardList, Package, Calendar } from "lucide-react"

// PDQ 340gr - Tiendas que necesitan surtido (surtir > 0)
const pdq340Data = [
  { tienda: "MTY ZUAZUA", codigo: "#2920", sal: 117, fuego: 86, jalapeno: 109 },
]

// PDQ 45gr - Tiendas que necesitan surtido (surtir > 0)
const pdq45Data = [
  { tienda: "MAT LAS BRISAS", codigo: "#2906", natural: 331, fuego: 312, jalapeno: 183 },
  { tienda: "MTY AZTLAN", codigo: "#2956", natural: 0, fuego: 111, jalapeno: 0 },
  { tienda: "REY AEROPUERTO", codigo: "#2995", natural: 150, fuego: 40, jalapeno: 133 },
  { tienda: "REY SAN FERNANDO", codigo: "#9107", natural: 268, fuego: 216, jalapeno: 266 },
]

// UPCs de referencia
const upcs = {
  "340gr": [
    { sabor: "SAL", upc: "7502256160833", color: "#F7B500" },
    { sabor: "FUEGO", upc: "7502256160840", color: "#E31837" },
    { sabor: "JALAPEÑO", upc: "7502256160857", color: "#27AE60" },
  ],
  "45gr": [
    { sabor: "NATURAL", upc: "7502256160802", color: "#F7B500" },
    { sabor: "FUEGO", upc: "7502256160819", color: "#E31837" },
    { sabor: "JALAPEÑO", upc: "7502256160826", color: "#27AE60" },
  ],
}

// Totales calculados
const subtotal340 = { sal: 117, fuego: 86, jalapeno: 109, total: 312 }
const subtotal45 = { natural: 749, fuego: 679, jalapeno: 582, total: 2010 }
const granTotal = 2322

export default function Slide9RelacionPDQ() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const renderValue = (val: number) => {
    if (val === 0) return <span className="text-gray-300">--</span>
    return <span className="font-semibold text-[#1A1A1A]">{val.toLocaleString()}</span>
  }

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
          Relación de PDQs a enviar a MI TIENDA
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Unidades necesarias para alcanzar 30 días de cobertura
        </p>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        {/* Left - Tables */}
        <div className="flex-1 flex flex-col gap-3">
          {/* PDQ 340gr Table */}
          <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Package size={15} className="text-[#E31837]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">PDQ 340gr</h3>
              <span className="text-[10px] text-gray-400">(Papa Casera)</span>
              <span className="ml-auto px-2 py-0.5 bg-[#E31837]/10 text-[#E31837] text-[9px] font-bold rounded">
                {pdq340Data.length} TIENDA
              </span>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="text-left py-1.5 px-2 rounded-l-lg font-semibold">Tienda</th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#F7B500]" />
                      SAL
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#E31837]" />
                      FUEGO
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                      JALAPEÑO
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 rounded-r-lg font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {pdq340Data.map((row, index) => (
                  <tr
                    key={row.codigo}
                    className={`border-b border-gray-100 transition-all duration-300 ${
                      isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 50}ms` }}
                  >
                    <td className="py-1.5 px-2">
                      <span className="font-semibold text-[#1A1A1A]">{row.tienda}</span>
                      <span className="text-gray-400 ml-1">({row.codigo})</span>
                    </td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.sal)}</td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.fuego)}</td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.jalapeno)}</td>
                    <td className="text-center py-1.5 px-2 font-bold text-[#E31837]">
                      {(row.sal + row.fuego + row.jalapeno).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Subtotal */}
                <tr className="bg-gray-50 font-bold">
                  <td className="py-1.5 px-2 text-gray-700">Subtotal</td>
                  <td className="text-center py-1.5 px-2">{subtotal340.sal}</td>
                  <td className="text-center py-1.5 px-2">{subtotal340.fuego}</td>
                  <td className="text-center py-1.5 px-2">{subtotal340.jalapeno}</td>
                  <td className="text-center py-1.5 px-2 text-[#E31837]">{subtotal340.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PDQ 45gr Table */}
          <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Package size={15} className="text-[#E31837]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">PDQ 45gr</h3>
              <span className="text-[10px] text-gray-400">(Papa Casera)</span>
              <span className="ml-auto px-2 py-0.5 bg-[#E31837]/10 text-[#E31837] text-[9px] font-bold rounded">
                {pdq45Data.length} TIENDAS
              </span>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="text-left py-1.5 px-2 rounded-l-lg font-semibold">Tienda</th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#F7B500]" />
                      NATURAL
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#E31837]" />
                      FUEGO
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                      JALAPEÑO
                    </div>
                  </th>
                  <th className="text-center py-1.5 px-2 rounded-r-lg font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {pdq45Data.map((row, index) => (
                  <tr
                    key={row.codigo}
                    className={`border-b border-gray-100 transition-all duration-300 ${
                      isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 50}ms` }}
                  >
                    <td className="py-1.5 px-2">
                      <span className="font-semibold text-[#1A1A1A]">{row.tienda}</span>
                      <span className="text-gray-400 ml-1">({row.codigo})</span>
                    </td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.natural)}</td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.fuego)}</td>
                    <td className="text-center py-1.5 px-2">{renderValue(row.jalapeno)}</td>
                    <td className="text-center py-1.5 px-2 font-bold text-[#E31837]">
                      {(row.natural + row.fuego + row.jalapeno).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Subtotal */}
                <tr className="bg-gray-50 font-bold">
                  <td className="py-1.5 px-2 text-gray-700">Subtotal</td>
                  <td className="text-center py-1.5 px-2">{subtotal45.natural.toLocaleString()}</td>
                  <td className="text-center py-1.5 px-2">{subtotal45.fuego.toLocaleString()}</td>
                  <td className="text-center py-1.5 px-2">{subtotal45.jalapeno.toLocaleString()}</td>
                  <td className="text-center py-1.5 px-2 text-[#E31837]">{subtotal45.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right - Summary Card */}
        <div
          className={`w-[340px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="h-full flex flex-col gap-3">
            {/* Resumen OC */}
            <div className="p-4 bg-gradient-to-br from-[#E31837]/10 to-[#E31837]/5 rounded-xl border border-[#E31837]/20">
              <h3 className="font-bold text-sm text-[#1A1A1A] mb-3 uppercase tracking-wide">Resumen OC</h3>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-xs text-gray-600">PDQ 340gr</span>
                  <span className="font-bold text-sm text-[#1A1A1A]">{subtotal340.total.toLocaleString()} pzs</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-xs text-gray-600">PDQ 45gr</span>
                  <span className="font-bold text-sm text-[#1A1A1A]">{subtotal45.total.toLocaleString()} pzs</span>
                </div>
              </div>

              <div className="border-t border-[#E31837]/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-[#1A1A1A]">TOTAL OC</span>
                  <span className="font-bold text-2xl text-[#E31837]">{granTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right">piezas</p>
              </div>
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

            {/* UPCs Reference */}
            <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[11px] text-gray-600 mb-2 uppercase tracking-wide">
                UPCs Referencia
              </h4>

              <div className="space-y-3">
                {/* 340gr UPCs */}
                <div>
                  <p className="text-[9px] font-semibold text-gray-400 mb-1">340gr</p>
                  <div className="space-y-1">
                    {upcs["340gr"].map((item) => (
                      <div key={item.upc} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[10px] text-gray-600 w-16">{item.sabor}</span>
                        <span className="text-[10px] font-mono text-gray-500">{item.upc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 45gr UPCs */}
                <div>
                  <p className="text-[9px] font-semibold text-gray-400 mb-1">45gr</p>
                  <div className="space-y-1">
                    {upcs["45gr"].map((item) => (
                      <div key={item.upc} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[10px] text-gray-600 w-16">{item.sabor}</span>
                        <span className="text-[10px] font-mono text-gray-500">{item.upc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          Fuente: MI TIENDA al 15/Feb/2026 (S15 FY2026) | Objetivo: 30 días de cobertura | BUENA VISTA y SAL SATELITE excluidos (problema anaquel, no falta de stock)
        </p>
      </div>
    </div>
  )
}
