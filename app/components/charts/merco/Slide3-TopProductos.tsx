"use client"

import { useState, useEffect } from "react"
import { Trophy, ShoppingCart, TrendingUp, Star } from "lucide-react"

const data = [
  { rank: 1, producto: "Tostada Roja 70pz", ventas: 14.2, porcentaje: 64.6, isBestSeller: true, trend: "+12%" },
  { rank: 2, producto: "Durito 20pz", ventas: 1.1, porcentaje: 5.1, isBestSeller: false, trend: "+8%" },
  { rank: 3, producto: "Cacahuate Mixto", ventas: 0.939, porcentaje: 4.3, isBestSeller: false, trend: "+15%" },
  { rank: 4, producto: "Cacahuate Cantinero", ventas: 0.740, porcentaje: 3.4, isBestSeller: false, trend: "+5%" },
  { rank: 5, producto: "Tostada Amarilla", ventas: 0.402, porcentaje: 1.8, isBestSeller: false, trend: "-3%" },
]

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  gray: "#6B7280",
  alert: "#DC2626",
  green: "#27AE60",
}

export default function Slide3TopProductos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const totalVentas = 22.0

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const activeIndex = selectedIndex !== null ? selectedIndex : hoveredIndex

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-4 flex justify-between items-start transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Que se Vende en sus Tiendas
          </h1>
          <p className="text-lg text-gray-500 mt-2">Top Productos Sell-Out 2025</p>
        </div>

        {/* Big number - animated hover */}
        <div
          className="flex items-center gap-3 px-6 py-4 bg-[#1A1A1A] rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <ShoppingCart size={28} className="text-[#F7B500]" />
          <div>
            <p className="text-3xl font-bold text-[#F7B500]">${totalVentas}M</p>
            <p className="text-xs text-gray-400">Ventas en tienda</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-8">
        {/* Table */}
        <div className="flex-1">
          {/* Header row */}
          <div
            className={`flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-t-xl border-b border-gray-200 transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-8 text-xs font-semibold text-gray-500">#</span>
            <span className="flex-1 text-xs font-semibold text-gray-500">PRODUCTO</span>
            <span className="w-28 text-xs font-semibold text-gray-500 text-right">VENTAS</span>
            <span className="w-20 text-xs font-semibold text-gray-500 text-right">% MIX</span>
            <span className="w-16 text-xs font-semibold text-gray-500 text-right">TREND</span>
            <span className="w-40 text-xs font-semibold text-gray-500">DISTRIBUCION</span>
          </div>

          {/* Data rows - animated */}
          {data.map((item, index) => (
            <div
              key={item.rank}
              className={`flex items-center gap-4 px-4 py-4 border-b border-gray-100 cursor-pointer transition-all duration-300 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              } ${
                activeIndex === index
                  ? "bg-amber-50 scale-[1.01] shadow-md -mx-2 px-6 rounded-xl"
                  : selectedIndex !== null && selectedIndex !== index
                  ? "opacity-50"
                  : "hover:bg-gray-50"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              {/* Rank */}
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  item.rank === 1 ? "bg-[#F7B500] text-[#1A1A1A]" : "bg-gray-100 text-gray-600"
                } ${activeIndex === index ? "scale-110" : ""}`}
              >
                {item.rank}
              </span>

              {/* Product name + alert */}
              <div className="flex-1 flex items-center gap-2">
                <span className={`font-medium transition-all duration-300 ${
                  item.rank === 1 ? "text-[#1A1A1A] font-semibold" : "text-gray-700"
                } ${activeIndex === index ? "font-bold" : ""}`}>
                  {item.producto}
                </span>
                {item.isBestSeller && (
                  <div className={`flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "animate-pulse" : ""
                  }`}>
                    <Trophy size={12} className="text-amber-600" />
                    <span className="text-xs text-amber-600 font-medium">Best Seller</span>
                  </div>
                )}
                {item.rank === 1 && activeIndex === index && (
                  <Star size={16} className="text-amber-500 animate-bounce-subtle" />
                )}
              </div>

              {/* Sales */}
              <span className={`w-28 text-right font-bold transition-all duration-300 ${
                item.rank === 1 ? "text-[#F7B500] text-lg" : "text-[#1A1A1A]"
              } ${activeIndex === index ? "scale-110" : ""}`}>
                ${item.ventas >= 1 ? `${item.ventas}M` : `${(item.ventas * 1000).toFixed(0)}K`}
              </span>

              {/* Percentage */}
              <span className={`w-20 text-right font-semibold transition-all duration-300 ${
                item.rank === 1 ? "text-[#1A1A1A]" : "text-gray-600"
              }`}>
                {item.porcentaje}%
              </span>

              {/* Trend */}
              <span className={`w-16 text-right text-sm font-medium ${
                item.trend.startsWith("+") ? "text-green-600" : "text-red-500"
              }`}>
                {item.trend}
              </span>

              {/* Bar - animated */}
              <div className="w-40">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLoaded ? "" : "w-0"
                    }`}
                    style={{
                      width: isLoaded ? `${item.porcentaje}%` : "0%",
                      backgroundColor: item.rank === 1 ? COLORS.gold : COLORS.gray,
                      transitionDelay: `${300 + index * 100}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Others row */}
          <div
            className={`flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-b-xl transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-medium">
              ...
            </span>
            <span className="flex-1 text-gray-500 font-medium">Otros productos</span>
            <span className="w-28 text-right text-gray-500 font-medium">$4.6M</span>
            <span className="w-20 text-right text-gray-500 font-medium">20.8%</span>
            <span className="w-16 text-right text-gray-400 text-sm">-</span>
            <div className="w-40">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-400 transition-all duration-500"
                  style={{
                    width: isLoaded ? "20.8%" : "0%",
                    transitionDelay: "700ms"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Side summary - animated */}
        <div className="w-[280px] flex flex-col gap-4">
          {/* Best Seller card */}
          <div
            className={`p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl transition-all duration-500 hover:border-amber-500 hover:shadow-lg cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={20} className="text-amber-600" />
              <span className="font-semibold text-amber-800">Producto Campeon</span>
            </div>
            <p className="text-sm text-amber-700 mb-3">
              Tostada Roja lidera las ventas con <span className="font-bold">65%</span> de participacion - el producto preferido por sus clientes.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-4 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F7B500] rounded-full transition-all duration-1000"
                  style={{ width: isLoaded ? "64.6%" : "0%" }}
                />
              </div>
              <span className="text-sm font-bold text-amber-800">64.6%</span>
            </div>
          </div>

          {/* Top product highlight */}
          <div
            className={`p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl transition-all duration-500 hover:border-amber-400 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-amber-600" />
              <p className="text-sm text-amber-700 font-medium">Producto Estrella</p>
            </div>
            <p className="text-xl font-bold text-[#1A1A1A]">Tostada Roja 70pz</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#F7B500]">$14.2M</span>
              <span className="text-sm text-amber-700">en ventas</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <TrendingUp size={14} />
              <span className="text-xs font-medium">+12% vs 2024</span>
            </div>
          </div>

          {/* Opportunity */}
          <div
            className={`p-5 bg-green-50 border border-green-200 rounded-2xl transition-all duration-500 hover:border-green-400 hover:bg-green-100 cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-sm text-green-600 font-medium mb-2">Oportunidad</p>
            <p className="text-sm text-green-700">
              <span className="font-semibold">Expandir el exito</span> de Tostada Roja a otras lineas de productos con alto potencial.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Tostada Roja lidera con 65% de participacion. Gran oportunidad de replicar este exito en otras categorias.
        </p>
      </div>
    </div>
  )
}
