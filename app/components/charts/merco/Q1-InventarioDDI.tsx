"use client"

import { useState, useEffect } from "react"
import { Warehouse, Store, Package, AlertTriangle, TrendingDown } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const ddiDistribution = [
  { name: "Sin Stock (inv=0)", value: 47, color: "#e03e3e" },
  { name: "Riesgo (<7 dias)", value: 82, color: "#d9730d" },
  { name: "Bajo (7-14 dias)", value: 156, color: "#ca8a04" },
  { name: "OK (14-30 dias)", value: 284, color: "#0f7b6c" },
  { name: "Alto (>30 dias)", value: 95, color: "#2383e2" },
]

const topProductosInventario = [
  { rank: 1, producto: "Tostada Roja 200gr", uds: 2840 },
  { rank: 2, producto: "Tostada Adobada 200gr", uds: 1650 },
  { rank: 3, producto: "Cacahuate Japones 180gr", uds: 1420 },
  { rank: 4, producto: "Papa Casera Sal 340gr", uds: 1180 },
  { rank: 5, producto: "Papa Casera Fuego 340gr", uds: 980 },
  { rank: 6, producto: "Torcidito Fuego 45gr", uds: 870 },
  { rank: 7, producto: "Papa Deshidratada 45gr", uds: 720 },
  { rank: 8, producto: "Cacahuate Enchilado 180gr", uds: 650 },
  { rank: 9, producto: "Papa Casera Jalapeno 340gr", uds: 580 },
  { rank: 10, producto: "Cheeto 45gr", uds: 560 },
]

const topQuiebres = [
  { tienda: "MERCO Juarez", quiebres: 8 },
  { tienda: "MERCO Apodaca", quiebres: 7 },
  { tienda: "MERCO Garcia", quiebres: 6 },
  { tienda: "MERCO San Nicolas", quiebres: 5 },
  { tienda: "MERCO Cadereyta", quiebres: 5 },
  { tienda: "MERCO Sta Catarina", quiebres: 4 },
  { tienda: "MERCO Pesqueria", quiebres: 4 },
  { tienda: "MERCO Allende", quiebres: 3 },
  { tienda: "MERCO Montemorelos", quiebres: 3 },
  { tienda: "MERCO China", quiebres: 3 },
]

const maxProductoUds = topProductosInventario[0].uds
const maxQuiebres = topQuiebres[0].quiebres

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

// Tooltip personalizado
const CustomDDITooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-3 min-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <p className="font-bold text-sm text-gray-900">{data.name}</p>
        </div>
        <p className="text-2xl font-bold" style={{ color: data.color }}>{data.value}</p>
        <p className="text-xs text-gray-500 mt-1">combinaciones producto×tienda</p>
      </div>
    )
  }
  return null
}

export default function Q1InventarioDDI() {
  const [hoveredProducto, setHoveredProducto] = useState<number | null>(null)
  const [hoveredQuiebre, setHoveredQuiebre] = useState<number | null>(null)
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const countInventario = useCountUp(12450, 2000, isLoaded)
  const countTiendas = useCountUp(38, 1500, isLoaded)
  const countProductos = useCountUp(42, 1500, isLoaded)
  const countQuiebres = useCountUp(47, 1800, isLoaded)

  const kpis = [
    { icon: Warehouse, color: "#0f7b6c", label: "Inventario Total", value: countInventario.toLocaleString("es-MX"), sub: "Unidades en stock" },
    { icon: Store, color: "#2383e2", label: "Tiendas con Stock", value: `${countTiendas}/48`, sub: "79% cobertura" },
    { icon: Package, color: "#9333ea", label: "Productos en Stock", value: countProductos.toString(), sub: "SKUs con inventario" },
    { icon: AlertTriangle, color: "#e03e3e", label: "Quiebres de Stock", value: countQuiebres.toString(), sub: "Producto×tienda sin inv" },
  ]

  return (
    <div className="w-[1280px] h-[720px] bg-white p-10 font-sans flex flex-col">
      {/* Header */}
      <div
        className={`mb-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
          Inventario & DDI
        </h1>
        <p className="text-lg text-gray-500 mt-1">Dias de inventario y quiebres de stock — MERCO</p>
      </div>

      {/* 4 KPI Cards */}
      <div className="flex gap-4 mb-5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          const isHovered = hoveredKpi === index
          return (
            <div
              key={kpi.label}
              className={`flex-1 border-2 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${
                isHovered
                  ? "border-[#F7B500] bg-amber-50 scale-105 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ transitionDelay: `${100 + index * 80}ms` }}
              onMouseEnter={() => setHoveredKpi(index)}
              onMouseLeave={() => setHoveredKpi(null)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${kpi.color}15` }}
              >
                <Icon size={20} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase">{kpi.label}</p>
                <p className="text-xl font-bold text-[#1A1A1A]">{kpi.value}</p>
                <p className="text-[10px] text-gray-400">{kpi.sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 2 paneles lado a lado */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Panel izquierdo — Pie Chart DDI */}
        <div
          className={`flex-1 flex flex-col transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-0.5">Distribucion DDI</h3>
          <p className="text-xs text-gray-400 mb-2">Dias de inventario disponible</p>

          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie
                  data={ddiDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={600}
                >
                  {ddiDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomDDITooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
            {ddiDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-gray-600">{item.name}</span>
                <span className="text-[10px] font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho — Barras de inventario por producto */}
        <div
          className={`flex-1 flex flex-col transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-0.5">Top Productos por Inventario</h3>
          <p className="text-xs text-gray-400 mb-2">Unidades en stock</p>

          <div className="flex-1 flex flex-col gap-1">
            {topProductosInventario.map((item, index) => {
              const isHovered = hoveredProducto === index
              return (
                <div
                  key={item.rank}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  } ${isHovered ? "bg-purple-50 scale-[1.01]" : "hover:bg-gray-50"}`}
                  style={{ transitionDelay: `${500 + index * 40}ms` }}
                  onMouseEnter={() => setHoveredProducto(index)}
                  onMouseLeave={() => setHoveredProducto(null)}
                >
                  <span className="text-[10px] font-bold text-gray-400 w-4 text-right">{item.rank}</span>
                  <span className={`w-40 truncate text-[11px] transition-all duration-200 ${
                    isHovered ? "font-bold text-[#1A1A1A]" : "text-gray-700"
                  }`}>
                    {item.producto}
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-700"
                      style={{
                        width: isLoaded ? `${(item.uds / maxProductoUds) * 100}%` : "0%",
                        backgroundColor: isHovered ? "#F7B500" : "#9333ea",
                        transitionDelay: `${600 + index * 50}ms`,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right text-[11px] font-bold text-gray-700">
                    {item.uds.toLocaleString("es-MX")}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Panel inferior — Quiebres por tienda */}
      <div
        className={`mt-4 border border-gray-200 rounded-2xl p-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={16} className="text-[#e03e3e]" />
          <span className="text-sm font-bold text-[#1A1A1A]">Tiendas con Quiebres de Stock</span>
          <span className="text-xs text-gray-400">(productos sin inventario)</span>
        </div>

        <div className="flex gap-2">
          {topQuiebres.map((item, index) => {
            const isHovered = hoveredQuiebre === index
            const barHeight = (item.quiebres / maxQuiebres) * 100
            const nombre = item.tienda.replace("MERCO ", "")

            return (
              <div
                key={item.tienda}
                className="flex-1 flex flex-col items-center cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredQuiebre(index)}
                onMouseLeave={() => setHoveredQuiebre(null)}
              >
                {/* Vertical bar container */}
                <div className="w-full h-8 bg-gray-100 rounded overflow-hidden flex items-end">
                  <div
                    className="w-full rounded transition-all duration-700"
                    style={{
                      height: isLoaded ? `${barHeight}%` : "0%",
                      backgroundColor: isHovered ? "#F7B500" : "#e03e3e",
                      transitionDelay: `${800 + index * 60}ms`,
                    }}
                  />
                </div>
                <span className={`text-[10px] font-bold mt-1 transition-colors duration-200 ${
                  isHovered ? "text-[#F7B500]" : "text-[#e03e3e]"
                }`}>
                  {item.quiebres}
                </span>
                <span className="text-[9px] text-gray-500 truncate w-full text-center" title={item.tienda}>
                  {nombre}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
