"use client"

import { useState, useEffect } from "react"
import { Package, CheckCircle, Truck, AlertTriangle, Search } from "lucide-react"

// Datos de inventario al 09/02/26 - DOS en días
// Regla: Si DOS < 9 días (30% de 30 días) → Alerta
const UMBRAL_DOS = 9
const UMBRAL_REVISAR = 200  // Si DOS > 200 días → Revisar bodega/anaquel

const data = [
  { tienda: "MTY ZUAZUA", sal: 0, fuego: 785, jalapeno: 0, surtir: true },
  { tienda: "SAL SATELITE", sal: 0, fuego: 0, jalapeno: 0, surtir: true },
  { tienda: "MTY BUENA VISTA", sal: 0, fuego: 0, jalapeno: 0, surtir: true },
  { tienda: "MAT LAS BRISAS", sal: 999, fuego: 748, jalapeno: 757, surtir: false },
  { tienda: "NVO REFORMA", sal: 75, fuego: 231, jalapeno: 65, surtir: false },
  { tienda: "MTY ELOY CAVAZOS", sal: 21, fuego: 37, jalapeno: 25, surtir: false },
  { tienda: "MTY GARCIA", sal: 52, fuego: 84, jalapeno: 65, surtir: false },
  { tienda: "MTY CABEZADA", sal: 81, fuego: 89, jalapeno: 78, surtir: false },
  { tienda: "MTY PLAZA DEL BOSQUE", sal: 85, fuego: 67, jalapeno: 56, surtir: false },
  { tienda: "REY BUGAMBILIAS", sal: 274, fuego: 442, jalapeno: 401, surtir: false },
  { tienda: "MTY METROPLEX", sal: 132, fuego: 346, jalapeno: 999, surtir: false },
  { tienda: "MTY MARGARITAS", sal: 164, fuego: 291, jalapeno: 160, surtir: false },
  { tienda: "NVO REVOLUCION", sal: 124, fuego: 294, jalapeno: 204, surtir: false },
  { tienda: "MTY SAN ROQUE", sal: 45, fuego: 32, jalapeno: 45, surtir: false },
  { tienda: "REY PERIFERICO", sal: 41, fuego: 66, jalapeno: 37, surtir: false },
  { tienda: "REY RIO BRAVO", sal: 67, fuego: 79, jalapeno: 79, surtir: false },
  { tienda: "MTY CIUDADELA", sal: 52, fuego: 118, jalapeno: 75, surtir: false },
  { tienda: "SAL FUNDADORES", sal: 205, fuego: 999, jalapeno: 374, surtir: false },
  { tienda: "MTY HUINALA", sal: 25, fuego: 51, jalapeno: 26, surtir: false },
  { tienda: "REY SAN FERNANDO", sal: 144, fuego: 114, jalapeno: 199, surtir: false },
  { tienda: "MTY LINCOLN", sal: 161, fuego: 133, jalapeno: 96, surtir: false },
  { tienda: "MTY ANZURES", sal: 96, fuego: 96, jalapeno: 88, surtir: false },
]

const tiendasSurtir = data.filter(d => d.surtir).length

export default function Slide6PDQ340() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const renderDOS = (value: number) => {
    const isAlerta = value < UMBRAL_DOS
    const isRevisar = value >= UMBRAL_REVISAR
    const displayValue = value > 500 ? ">500" : `${value}d`

    return (
      <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg ${
        isAlerta ? "bg-red-100" : isRevisar ? "bg-amber-100" : "bg-green-50"
      }`}>
        <span className={`font-bold ${
          isAlerta ? "text-red-600" : isRevisar ? "text-amber-600" : "text-green-600"
        }`}>
          {displayValue}
        </span>
        {isAlerta && <AlertTriangle size={12} className="text-red-500" />}
        {isRevisar && <Search size={12} className="text-amber-500" />}
      </div>
    )
  }

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
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#E31837]/10 rounded-xl">
                <Package size={24} className="text-[#E31837]" />
              </div>
              <span className="text-sm font-semibold text-[#E31837] uppercase tracking-wider">
                Alertas de Surtido
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 340gr - Días de Inventario por Tienda
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Inventario al 09/Feb/2026 | Regla: Si cualquier sabor tiene DOS {"<"} 9 días → Surtir PDQ completo
            </p>
          </div>

          {/* KPI */}
          <div className={`px-6 py-3 rounded-2xl border-2 ${
            tiendasSurtir > 0
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}>
            <div className="flex items-center gap-3">
              <Truck size={24} className={tiendasSurtir > 0 ? "text-red-500" : "text-green-500"} />
              <div>
                <span className={`text-3xl font-bold ${tiendasSurtir > 0 ? "text-red-600" : "text-green-600"}`}>
                  {tiendasSurtir}
                </span>
                <span className="text-sm text-gray-600 ml-2">tiendas necesitan surtido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`flex-1 overflow-hidden transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="bg-gray-50 rounded-2xl h-full flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 p-3 bg-gray-100 rounded-t-2xl text-sm font-semibold text-gray-600">
            <span>Tienda</span>
            <span className="text-center">
              <span className="inline-flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#F7B500]" /> Sal
              </span>
            </span>
            <span className="text-center">
              <span className="inline-flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#E31837]" /> Fuego
              </span>
            </span>
            <span className="text-center">
              <span className="inline-flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#27AE60]" /> Jalapeño
              </span>
            </span>
            <span className="text-center">¿Surtir?</span>
          </div>

          {/* Rows */}
          <div className="flex-1 overflow-y-auto">
            {data.map((item, index) => {
              const isHovered = hoveredRow === index

              return (
                <div
                  key={item.tienda}
                  className={`grid grid-cols-5 gap-4 p-3 border-b border-gray-200 cursor-pointer transition-all duration-200 ${
                    item.surtir
                      ? isHovered ? "bg-red-100" : "bg-red-50"
                      : isHovered ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <span className={`text-sm font-medium ${item.surtir ? "text-red-700" : "text-gray-800"}`}>
                    {item.tienda}
                  </span>
                  <div className="flex justify-center">
                    {renderDOS(item.sal)}
                  </div>
                  <div className="flex justify-center">
                    {renderDOS(item.fuego)}
                  </div>
                  <div className="flex justify-center">
                    {renderDOS(item.jalapeno)}
                  </div>
                  <div className="flex justify-center">
                    {item.surtir ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        <Truck size={12} /> SURTIR
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <CheckCircle size={12} /> OK
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
