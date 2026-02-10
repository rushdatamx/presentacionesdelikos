"use client"

import { useState, useEffect } from "react"
import { Package, AlertTriangle, CheckCircle, Truck, Search } from "lucide-react"

// Datos de inventario al 09/02/26 - DOS en días
// Regla: Si DOS < 9 días (30% de 30 días) → Alerta
const UMBRAL_DOS = 9
const UMBRAL_REVISAR = 200  // Si DOS > 200 días → Revisar bodega/anaquel

const data = [
  { tienda: "CAT MONTERREY", natural: 0, fuego: 0, jalapeno: 0, surtir: true },
  { tienda: "MTY AZTLAN", natural: 337, fuego: 0, jalapeno: 999, surtir: true },
  { tienda: "REY RIO BRAVO", natural: 11, fuego: 7, jalapeno: 4, surtir: true },
  { tienda: "REY AEROPUERTO", natural: 7, fuego: 19, jalapeno: 9, surtir: true },
  { tienda: "REY SAN FERNANDO", natural: 3, fuego: 14, jalapeno: 8, surtir: true },
  { tienda: "MAT LAS BRISAS", natural: 19, fuego: 23, jalapeno: 27, surtir: false },
  { tienda: "NVO REFORMA", natural: 51, fuego: 54, jalapeno: 83, surtir: false },
  { tienda: "MTY ELOY CAVAZOS", natural: 63, fuego: 57, jalapeno: 49, surtir: false },
  { tienda: "MTY ZUAZUA", natural: 27, fuego: 39, jalapeno: 48, surtir: false },
  { tienda: "MTY GARCIA", natural: 163, fuego: 144, jalapeno: 137, surtir: false },
  { tienda: "MTY CABEZADA", natural: 58, fuego: 115, jalapeno: 123, surtir: false },
  { tienda: "MTY PLAZA DEL BOSQUE", natural: 87, fuego: 162, jalapeno: 141, surtir: false },
  { tienda: "REY BUGAMBILIAS", natural: 266, fuego: 439, jalapeno: 486, surtir: false },
  { tienda: "MTY METROPLEX", natural: 26, fuego: 38, jalapeno: 23, surtir: false },
  { tienda: "SAL SATELITE", natural: 105, fuego: 166, jalapeno: 185, surtir: false },
  { tienda: "MTY VALLE STA MARIA", natural: 14, fuego: 32, jalapeno: 27, surtir: false },
  { tienda: "MTY MARGARITAS", natural: 262, fuego: 100, jalapeno: 94, surtir: false },
  { tienda: "NVO REVOLUCION", natural: 69, fuego: 73, jalapeno: 44, surtir: false },
  { tienda: "MTY SAN ROQUE", natural: 143, fuego: 221, jalapeno: 279, surtir: false },
  { tienda: "REY PERIFERICO", natural: 46, fuego: 44, jalapeno: 40, surtir: false },
  { tienda: "MTY CIUDADELA", natural: 35, fuego: 40, jalapeno: 35, surtir: false },
  { tienda: "SAL FUNDADORES", natural: 345, fuego: 999, jalapeno: 999, surtir: false },
  { tienda: "MTY HUINALA", natural: 30, fuego: 47, jalapeno: 49, surtir: false },
  { tienda: "MTY BUENA VISTA", natural: 36, fuego: 54, jalapeno: 54, surtir: false },
  { tienda: "MTY LINCOLN", natural: 40, fuego: 66, jalapeno: 43, surtir: false },
  { tienda: "MTY ANZURES", natural: 57, fuego: 72, jalapeno: 97, surtir: false },
]

const tiendasSurtir = data.filter(d => d.surtir).length

export default function Slide7PDQ45() {
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
              <div className="p-2 bg-[#27AE60]/10 rounded-xl">
                <Package size={24} className="text-[#27AE60]" />
              </div>
              <span className="text-sm font-semibold text-[#27AE60] uppercase tracking-wider">
                Alertas de Surtido
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
              PDQ 45gr - Días de Inventario por Tienda
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
                <div className="w-3 h-3 rounded bg-[#F7B500]" /> Natural
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
                    {renderDOS(item.natural)}
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
