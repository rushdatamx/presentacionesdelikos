"use client"

import { useState, useEffect } from "react"
import { RefreshCw, TrendingUp, Clock, Rocket, Star } from "lucide-react"

const productosRotacion = [
  { rank: 1, producto: "Tostada Roja 70pz Mimarca", venta: 6116155, porcentaje: 51.6, diasInv: 14, potencial: false },
  { rank: 2, producto: "Papa Natural Casera 45gr", venta: 267613, porcentaje: 9.4, diasInv: 30, potencial: false },
  { rank: 3, producto: "Papa Fuego Casera 45gr", venta: 233619, porcentaje: 8.3, diasInv: 34, potencial: false },
  { rank: 4, producto: "Papa Jalapeno Casera 45gr", venta: 232488, porcentaje: 8.2, diasInv: 37, potencial: false },
  { rank: 5, producto: "Tostada Roja Mimarca 200gr", venta: 193708, porcentaje: 4.7, diasInv: 58, potencial: false },
  { rank: 6, producto: "Tostada Amarilla Mimarca 200gr", venta: 183340, porcentaje: 4.4, diasInv: 37, potencial: true },
  { rank: 7, producto: "Cacahuate Mixto Granel", venta: 219840, porcentaje: 0.9, diasInv: 55, potencial: true },
  { rank: 8, producto: "Durito Teja 20pz", venta: 134824, porcentaje: 0.8, diasInv: 33, potencial: true },
  { rank: 9, producto: "Cacahuate Cantinero Granel", venta: 150131, porcentaje: 0.6, diasInv: 139, potencial: false },
  { rank: 10, producto: "Papa Jalapeno 340gr", venta: 31903, porcentaje: 0.2, diasInv: 27, potencial: true },
  { rank: 11, producto: "Papa Sal Natural 340gr", venta: 31731, porcentaje: 0.2, diasInv: 29, potencial: true },
  { rank: 12, producto: "Cheto Mix 400gr", venta: 35701, porcentaje: 0.2, diasInv: 73, potencial: false },
  { rank: 13, producto: "Rueda Natural 400gr", venta: 32496, porcentaje: 0.2, diasInv: 55, potencial: true },
  { rank: 14, producto: "Cacahuate Salado Granel", venta: 27942, porcentaje: 0.1, diasInv: 83, potencial: false },
  { rank: 15, producto: "Minicuadro Natural 400gr", venta: 25140, porcentaje: 0.1, diasInv: 80, potencial: false },
  { rank: 16, producto: "Papa Fuego 340gr", venta: 24506, porcentaje: 0.2, diasInv: 91, potencial: false },
  { rank: 17, producto: "Palomitas Elote 25g", venta: 5222, porcentaje: 0.1, diasInv: 438, potencial: false },
  { rank: 18, producto: "Rodajitas Spicy Limon 30g", venta: 5654, porcentaje: 0.1, diasInv: 625, potencial: false },
  { rank: 19, producto: "Palomitas Cheddar Jal 25g", venta: 4719, porcentaje: 0.1, diasInv: 527, potencial: false },
  { rank: 20, producto: "Palomitas Classic White 25g", venta: 4577, porcentaje: 0.1, diasInv: 420, potencial: false },
]


const getDiasColor = (dias: number) => {
  if (dias <= 30) return "#27AE60"
  if (dias <= 60) return "#F7B500"
  return "#6B7280"
}

export default function Slide6RotacionProductos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const promedioRotacion = Math.round(productosRotacion.reduce((acc, p) => acc + p.diasInv, 0) / productosRotacion.length)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-10 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-5 flex justify-between items-center transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#27AE60]/10 rounded-xl">
            <RefreshCw size={26} className="text-[#27AE60]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
              Rotacion de Productos
            </h1>
            <p className="text-base text-gray-500">Ultimos 3 meses - Oportunidades de Crecimiento</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-[#1A1A1A] rounded-xl flex items-center gap-3">
            <Clock size={20} className="text-[#F7B500]" />
            <div>
              <p className="text-2xl font-bold text-[#F7B500]">{promedioRotacion}d</p>
              <p className="text-xs text-gray-400">Prom. rotacion</p>
            </div>
          </div>
          <div className="px-5 py-3 bg-[#27AE60]/10 rounded-xl flex items-center gap-3 border border-[#27AE60]/20">
            <TrendingUp size={20} className="text-[#27AE60]" />
            <div>
              <p className="text-2xl font-bold text-[#27AE60]">87%</p>
              <p className="text-xs text-gray-600">Sell-through</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Table con scroll elegante - ahora ocupa todo el ancho */}
        <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl overflow-hidden w-full">
          {/* Header row */}
          <div
            className={`flex items-center gap-4 px-5 py-3 bg-gray-100 border-b border-gray-200 transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-8 text-xs font-semibold text-gray-500 text-center">#</span>
            <span className="flex-1 text-xs font-semibold text-gray-500">PRODUCTO</span>
            <span className="w-20 text-xs font-semibold text-gray-500 text-right">VENTA</span>
            <span className="w-14 text-xs font-semibold text-gray-500 text-right">% MIX</span>
            <span className="w-24 text-xs font-semibold text-gray-500 text-center">DIAS INV</span>
            <span className="w-16 text-xs font-semibold text-gray-500 text-center"></span>
          </div>

          {/* Scrollable data rows */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            {productosRotacion.map((item, index) => {
              const isHovered = hoveredIndex === index
              const diasColor = getDiasColor(item.diasInv)

              return (
                <div
                  key={item.rank}
                  className={`flex items-center gap-4 px-5 py-2.5 border-b border-gray-200/50 cursor-pointer transition-all duration-200 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  } ${
                    isHovered ? "bg-amber-50 scale-[1.01]" : "bg-white hover:bg-gray-50"
                  }`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Rank */}
                  <span
                    className={`w-8 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${
                      item.rank === 1 ? "bg-[#F7B500] text-[#1A1A1A]" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.rank}
                  </span>

                  {/* Product name */}
                  <div className="flex-1 flex items-center gap-2">
                    <span className={`text-sm ${
                      item.rank === 1 ? "font-bold text-[#1A1A1A]" : "font-medium text-gray-700"
                    } ${isHovered ? "font-semibold" : ""}`}>
                      {item.producto}
                    </span>
                    {item.rank === 1 && <Star size={14} className="text-amber-500 flex-shrink-0" />}
                  </div>

                  {/* Sales */}
                  <span className={`w-20 text-right text-sm font-bold ${
                    item.rank === 1 ? "text-[#F7B500]" : "text-[#1A1A1A]"
                  }`}>
                    ${item.venta >= 1000000 ? `${(item.venta / 1000000).toFixed(1)}M` : `${(item.venta / 1000).toFixed(0)}K`}
                  </span>

                  {/* Percentage */}
                  <span className="w-14 text-right text-sm text-gray-500 font-medium">
                    {item.porcentaje}%
                  </span>

                  {/* Days inventory with bar */}
                  <div className="w-24 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isLoaded ? `${Math.min(item.diasInv / 6, 100)}%` : "0%",
                          backgroundColor: diasColor,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: diasColor }}>
                      {item.diasInv}
                    </span>
                  </div>

                  {/* Potential indicator */}
                  <div className="w-16 flex justify-center">
                    {item.potencial && (
                      <div className={`flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full transition-all duration-300 ${
                        isHovered ? "scale-105 bg-blue-200" : ""
                      }`}>
                        <Rocket size={10} className="text-blue-600" />
                        <span className="text-[10px] text-blue-600 font-semibold">Potencial</span>
                      </div>
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
