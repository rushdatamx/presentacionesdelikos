"use client"

import { useState, useEffect } from "react"
import { Store, TrendingUp, Award, MapPin, Sparkles, ArrowLeft, BarChart3, Hash, Percent } from "lucide-react"

const RANK_COLORS = [
  "#0f7b6c", "#2383e2", "#d9730d", "#9333ea", "#e03e3e",
  "#0891b2", "#4f46e5", "#059669", "#ca8a04", "#be185d"
]

const topTiendas = [
  { rank: 1, tienda: "MERCO Buenavista", unidades: 5842, ciudad: "Monterrey" },
  { rank: 2, tienda: "MERCO Sendero", unidades: 4217, ciudad: "Monterrey" },
  { rank: 3, tienda: "MERCO Lincoln", unidades: 3956, ciudad: "Monterrey" },
  { rank: 4, tienda: "MERCO Ruiz Cortines", unidades: 3421, ciudad: "Guadalupe" },
  { rank: 5, tienda: "MERCO Guadalupe", unidades: 3198, ciudad: "Guadalupe" },
  { rank: 6, tienda: "MERCO Contry", unidades: 2876, ciudad: "Monterrey" },
  { rank: 7, tienda: "MERCO Linda Vista", unidades: 2654, ciudad: "Monterrey" },
  { rank: 8, tienda: "MERCO Cumbres", unidades: 2543, ciudad: "Monterrey" },
  { rank: 9, tienda: "MERCO Escobedo", unidades: 2387, ciudad: "Escobedo" },
  { rank: 10, tienda: "MERCO Juarez", unidades: 2102, ciudad: "Juarez" },
]

const restoTiendas = [
  { tienda: "Garcia", unidades: 1980 },
  { tienda: "Los Pilares", unidades: 1875 },
  { tienda: "Girasoles", unidades: 1820 },
  { tienda: "Solidaridad", unidades: 1745 },
  { tienda: "Paraje San Jose", unidades: 1690 },
  { tienda: "Sta Catarina", unidades: 1634 },
  { tienda: "Zuazua", unidades: 1578 },
  { tienda: "Montemorelos", unidades: 1520 },
  { tienda: "Apodaca", unidades: 1465 },
  { tienda: "San Nicolas", unidades: 1410 },
  { tienda: "Cadereyta", unidades: 1356 },
  { tienda: "Pesqueria", unidades: 1298 },
  { tienda: "Allende", unidades: 1245 },
  { tienda: "China", unidades: 1190 },
  { tienda: "Linares", unidades: 1134 },
  { tienda: "Santiago", unidades: 1080 },
  { tienda: "Salinas Victoria", unidades: 1025 },
  { tienda: "Cienega", unidades: 970 },
  { tienda: "El Carmen", unidades: 920 },
  { tienda: "San Pedro", unidades: 875 },
  { tienda: "La Fama", unidades: 830 },
  { tienda: "Mitras", unidades: 785 },
  { tienda: "Loma Larga", unidades: 740 },
  { tienda: "Moderna", unidades: 698 },
  { tienda: "Constituyentes", unidades: 655 },
  { tienda: "Del Valle", unidades: 612 },
  { tienda: "San Jeronimo", unidades: 570 },
  { tienda: "Valle Alto", unidades: 530 },
  { tienda: "Pedregal", unidades: 492 },
  { tienda: "Las Torres", unidades: 458 },
  { tienda: "Industrial", unidades: 425 },
  { tienda: "Nogalar", unidades: 395 },
  { tienda: "Obrera", unidades: 368 },
  { tienda: "Terminal", unidades: 342 },
  { tienda: "Centro", unidades: 320 },
  { tienda: "Independencia", unidades: 298 },
  { tienda: "Colon", unidades: 278 },
  { tienda: "Victoria", unidades: 260 },
]

const totalUnidades = topTiendas.reduce((a, t) => a + t.unidades, 0) + restoTiendas.reduce((a, t) => a + t.unidades, 0)
const top10Total = topTiendas.reduce((a, t) => a + t.unidades, 0)
const top10Pct = ((top10Total / totalUnidades) * 100).toFixed(1)
const maxUnidades = topTiendas[0].unidades

// Hook para animacion count-up
const useCountUp = (end: number, duration = 2000, startAnimation = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.round(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startAnimation])

  return count
}

export default function Q1TopTiendas() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const activeIndex = selectedIndex !== null ? selectedIndex : hoveredIndex

  const countTotal = useCountUp(totalUnidades, 2000, isLoaded)

  // ZOOM VIEW
  if (zoomedIndex !== null) {
    const tienda = topTiendas[zoomedIndex]
    const pct = ((tienda.unidades / totalUnidades) * 100).toFixed(1)

    return <ZoomView
      tienda={tienda}
      pct={pct}
      zoomedIndex={zoomedIndex}
      onBack={() => setZoomedIndex(null)}
    />
  }

  // MAIN VIEW
  return (
    <div className="w-[1280px] h-[720px] bg-white p-10 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 flex justify-between items-start transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Top Tiendas Merco por Volumen
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            48 tiendas activas | Top 10 = {top10Pct}% del volumen |{" "}
            <span className="text-[#F7B500] font-medium">Click en barra para zoom</span>
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div
            className={`flex items-center gap-3 px-5 py-3 bg-[#1A1A1A] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Store size={24} className="text-[#F7B500]" />
            <div>
              <p className="text-2xl font-bold text-[#F7B500]">48</p>
              <p className="text-xs text-gray-400">Tiendas activas</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-200 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-amber-400 cursor-pointer ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <TrendingUp size={24} className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{countTotal.toLocaleString("es-MX")}</p>
              <p className="text-xs text-amber-700">Uds totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10 filas interactivas */}
      <div className="flex-1 flex flex-col gap-1.5">
        {topTiendas.map((item, index) => {
          const isActive = activeIndex === index
          const isDimmed = selectedIndex !== null && selectedIndex !== index
          const color = RANK_COLORS[index]
          const pct = ((item.unidades / totalUnidades) * 100).toFixed(1)

          return (
            <div
              key={item.rank}
              className={`flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              } ${
                isActive
                  ? "bg-amber-50 scale-[1.02] shadow-md -mx-2 px-6"
                  : isDimmed
                  ? "opacity-40"
                  : "hover:bg-gray-50"
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setZoomedIndex(index)}
            >
              {/* Rank badge */}
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold text-white transition-all duration-300 ${
                  isActive ? "scale-125" : ""
                }`}
                style={{ backgroundColor: color }}
              >
                {isActive && item.rank <= 3 ? (
                  <Award size={14} />
                ) : (
                  item.rank
                )}
              </span>

              {/* Store name */}
              <div className="w-52 flex items-center gap-2">
                <span className={`text-sm font-medium text-[#1A1A1A] truncate transition-all duration-300 ${
                  isActive ? "font-bold" : ""
                }`}>
                  {item.tienda}
                </span>
                {isActive && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full animate-fade-in">
                    <MapPin size={10} className="text-gray-500" />
                    <span className="text-[10px] text-gray-500">{item.ciudad}</span>
                  </div>
                )}
              </div>

              {/* Bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                    style={{
                      width: isLoaded ? `${(item.unidades / maxUnidades) * 100}%` : "0%",
                      backgroundColor: color,
                      transitionDelay: `${400 + index * 80}ms`,
                      transform: isActive ? "scaleY(1.15)" : "scaleY(1)",
                      transformOrigin: "center",
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {item.unidades.toLocaleString("es-MX")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Percentage */}
              <div className="w-14 flex items-center justify-end gap-1">
                {item.rank <= 3 && isActive && (
                  <Sparkles size={12} className="text-amber-500 animate-pulse" />
                )}
                <span className={`text-sm font-bold transition-all duration-300 ${
                  item.rank <= 3 ? "text-[#F7B500]" : "text-gray-600"
                } ${isActive ? "scale-110" : ""}`}>
                  {pct}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resto de tiendas */}
      <div
        className={`mt-3 p-3 bg-gray-50 rounded-xl transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-xs font-semibold text-gray-500 mb-2">Resto de tiendas (38)</p>
        <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-hidden">
          {restoTiendas.map((t) => (
            <span
              key={t.tienda}
              className="px-2 py-0.5 bg-white rounded-md border border-gray-200 text-[10px] text-gray-600 hover:border-[#F7B500] transition-colors duration-200"
            >
              {t.tienda} <span className="text-gray-400">{t.unidades.toLocaleString("es-MX")}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-3 pt-3 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Las top 10 tiendas representan el {top10Pct}% del total. Click en cualquier barra para ver detalle.
        </p>
      </div>
    </div>
  )
}

// ==========================================
// ZOOM VIEW COMPONENT
// ==========================================

function ZoomView({
  tienda,
  pct,
  zoomedIndex,
  onBack,
}: {
  tienda: typeof topTiendas[0]
  pct: string
  zoomedIndex: number
  onBack: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const countUnidades = useCountUp(tienda.unidades, 1500, isLoaded)
  const countPct = useCountUp(parseFloat(pct) * 10, 1500, isLoaded)

  return (
    <div className="w-[1280px] h-[720px] bg-white p-10 font-sans flex flex-col">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#F7B500] transition-colors duration-300 mb-4 animate-fade-in"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Volver al ranking</span>
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <div className="w-14 h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center">
          <Store size={28} className="text-[#F7B500]" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">{tienda.tienda}</h1>
          <div className="flex items-center gap-1 mt-1 text-gray-500">
            <MapPin size={14} />
            <span className="text-sm">{tienda.ciudad}</span>
          </div>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="flex gap-6 mb-8">
        {/* Unidades */}
        <div
          className={`flex-1 p-5 bg-[#1A1A1A] rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-[#F7B500]" />
            <span className="text-xs text-gray-400">Unidades vendidas</span>
          </div>
          <p className="text-4xl font-bold text-[#F7B500]">{countUnidades.toLocaleString("es-MX")}</p>
        </div>

        {/* Posicion */}
        <div
          className={`flex-1 p-5 bg-white border-2 border-gray-200 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:border-[#F7B500] cursor-pointer ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Hash size={18} className="text-[#F7B500]" />
            <span className="text-xs text-gray-500">Posicion en ranking</span>
          </div>
          <p className="text-4xl font-bold text-[#1A1A1A]">#{tienda.rank}</p>
        </div>

        {/* Participacion */}
        <div
          className={`flex-1 p-5 bg-white border-2 border-gray-200 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:border-[#F7B500] cursor-pointer ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Percent size={18} className="text-[#F7B500]" />
            <span className="text-xs text-gray-500">Participacion del total</span>
          </div>
          <p className="text-4xl font-bold text-[#1A1A1A]">{(countPct / 10).toFixed(1)}%</p>
        </div>
      </div>

      {/* Comparative chart */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Comparacion vs Top 10</h3>
        <div className="flex-1 flex flex-col gap-1">
          {topTiendas.map((t, index) => {
            const isSelected = index === zoomedIndex
            return (
              <div
                key={t.rank}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                } ${isSelected ? "bg-amber-50" : ""}`}
                style={{ transitionDelay: `${400 + index * 60}ms` }}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold text-white`}
                  style={{ backgroundColor: isSelected ? "#0f7b6c" : "#e3e3e1" }}
                >
                  <span className={isSelected ? "text-white" : "text-gray-500"}>{t.rank}</span>
                </span>
                <span className={`w-40 text-xs truncate ${
                  isSelected ? "font-bold text-[#1A1A1A]" : "text-gray-500"
                }`}>
                  {t.tienda}
                </span>
                <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-700"
                    style={{
                      width: isLoaded ? `${(t.unidades / maxUnidades) * 100}%` : "0%",
                      backgroundColor: isSelected ? "#0f7b6c" : "#e3e3e1",
                      transitionDelay: `${500 + index * 60}ms`,
                    }}
                  />
                </div>
                <span className={`w-14 text-right text-xs font-bold ${
                  isSelected ? "text-[#0f7b6c]" : "text-gray-400"
                }`}>
                  {t.unidades.toLocaleString("es-MX")}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-4 pt-3 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          {tienda.tienda} representa el {pct}% de las ventas totales de MERCO
        </p>
      </div>
    </div>
  )
}
