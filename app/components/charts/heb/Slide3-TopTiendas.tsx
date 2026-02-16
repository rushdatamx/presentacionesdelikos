"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, TrendingUp, MapPin } from "lucide-react"

// Datos calculados desde: scripts/calcular_metricas_mitienda.py
// Top 5 tiendas con mayor venta de PDQ (340gr + 45gr)
// Excluye CAT MONTERREY (2160) - es CEDIS

const topTiendas = [
  { rank: 1, tienda: "NVO REVOLUCION", codigo: "2948", unidades: 9039, pctTotal: 6.8 },
  { rank: 2, tienda: "REY SAN FERNANDO", codigo: "9107", unidades: 8213, pctTotal: 6.1 },
  { rank: 3, tienda: "MAT LAS BRISAS", codigo: "2906", unidades: 8272, pctTotal: 5.9 },
  { rank: 4, tienda: "MTY HUINALA", codigo: "2994", unidades: 8260, pctTotal: 6.0 },
  { rank: 5, tienda: "NVO REFORMA", codigo: "2911", unidades: 7956, pctTotal: 6.0 },
]

const totalUnidadesTop5 = topTiendas.reduce((acc, t) => acc + t.unidades, 0)
const pctConcentracion = 31.0 // Top 5 = 31.0% del total

export default function Slide3TopTiendas() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: "bg-[#F7B500]", text: "text-white" }
    if (rank === 2) return { bg: "bg-gray-400", text: "text-white" }
    if (rank === 3) return { bg: "bg-amber-600", text: "text-white" }
    return { bg: "bg-gray-200", text: "text-gray-600" }
  }

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#F7B500]/10 rounded-xl">
            <Trophy size={28} className="text-[#F7B500]" />
          </div>
          <span className="text-sm font-semibold text-[#F7B500] uppercase tracking-wider">
            Tiendas Estrella
          </span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Donde más rota el PDQ
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Estas 5 tiendas mueven el 31% del volumen total
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-8">
        {/* Left - Ranking */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="space-y-3">
            {topTiendas.map((tienda, index) => {
              const rankStyle = getRankStyle(tienda.rank)
              const isHovered = hoveredRow === index
              const barWidth = (tienda.unidades / topTiendas[0].unidades) * 100

              return (
                <div
                  key={tienda.codigo}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#F7B500] shadow-lg scale-[1.02] bg-[#F7B500]/5"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${rankStyle.bg} ${rankStyle.text}`}
                    >
                      {tienda.rank === 1 ? <Star size={24} /> : tienda.rank}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-[#1A1A1A]">{tienda.tienda}</span>
                        <span className="text-xs text-gray-400">#{tienda.codigo}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[#F7B500] to-[#E31837]"
                          style={{
                            width: isLoaded ? `${barWidth}%` : "0%",
                            transitionDelay: `${400 + index * 100}ms`
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#1A1A1A]">
                        {tienda.unidades.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tienda.pctTotal}% del total
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right - Insight */}
        <div
          className={`w-[380px] transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Summary Card */}
          <div className="p-6 bg-gradient-to-br from-[#F7B500]/10 to-[#F7B500]/5 rounded-3xl border-2 border-[#F7B500]/30 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={24} className="text-[#F7B500]" />
              <span className="font-bold text-lg text-[#1A1A1A]">Top 5 combinado</span>
            </div>
            <p className="text-5xl font-bold text-[#F7B500] mb-2">
              {totalUnidadesTop5.toLocaleString()}
            </p>
            <p className="text-gray-600">
              unidades vendidas
            </p>
            <div className="mt-4 pt-4 border-t border-[#F7B500]/20">
              <p className="text-sm text-gray-600">
                Representa el <span className="font-bold text-[#1A1A1A]">{pctConcentracion}%</span> del total de ventas PDQ en 25 tiendas MI TIENDA
              </p>
            </div>
          </div>

          {/* Insight Box */}
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-[#27AE60]" />
              <span className="font-semibold text-gray-700">Patrón geográfico</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Las tiendas con mejor rotación están en zonas de alto tráfico:
              Revolución, Huinala, Ciudadela.
            </p>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              <span className="font-bold text-[#27AE60]">Oportunidad:</span> Podemos replicar este desempeño en más tiendas asegurando disponibilidad continua.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <p className="text-xs text-gray-400 text-center">
          Fuente: Portal MI TIENDA (Sell-Out) | Periodo 2024-12 a 2026-04 | Solo PDQ 340gr y 45gr | Excluye CAT Monterrey
        </p>
      </div>
    </div>
  )
}
