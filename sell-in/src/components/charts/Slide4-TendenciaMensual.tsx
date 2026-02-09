"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, LabelList } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const data = [
  { mes: "Ene", HEB: 551, MERCO: 1537, FUTURAMA: 1478 },
  { mes: "Feb", HEB: 513, MERCO: 937, FUTURAMA: 859 },
  { mes: "Mar", HEB: 496, MERCO: 1251, FUTURAMA: 8126 },
  { mes: "Abr", HEB: 657, MERCO: 1602, FUTURAMA: 7103 },
  { mes: "May", HEB: 557, MERCO: 1285, FUTURAMA: 2360 },
  { mes: "Jun", HEB: 703, MERCO: 1245, FUTURAMA: 2187 },
  { mes: "Jul", HEB: 561, MERCO: 1850, FUTURAMA: 2725 },
  { mes: "Ago", HEB: 1127, MERCO: 1516, FUTURAMA: 2048 },
  { mes: "Sep", HEB: 395, MERCO: 2116, FUTURAMA: 2349 },
  { mes: "Oct", HEB: 1096, MERCO: 1605, FUTURAMA: 3434 },
  { mes: "Nov", HEB: 307, MERCO: 1884, FUTURAMA: 3435 },
  { mes: "Dic", HEB: 906, MERCO: 1631, FUTURAMA: 2659 },
]

// Totales anuales
const totals = {
  FUTURAMA: "$38.8M",
  MERCO: "$18.5M",
  HEB: "$7.9M"
}

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  gray: "#6B7280",
  heb: "#1A1A1A",
  merco: "#F7B500",
  futurama: "#9CA3AF",
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0)
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-5 min-w-[220px] animate-fade-in">
        <p className="font-bold text-gray-900 mb-3 text-lg border-b pb-2">{label} 2025</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-1.5 hover:bg-gray-50 px-2 rounded transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
            <span className="font-semibold" style={{ color: entry.color }}>
              ${(entry.value / 1000).toFixed(1)}M
            </span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between px-2">
          <span className="text-sm font-medium text-gray-500">Total</span>
          <span className="font-bold text-gray-900">${(total / 1000).toFixed(1)}M</span>
        </div>
      </div>
    )
  }
  return null
}

export default function Slide4TendenciaMensual() {
  const [activeClient, setActiveClient] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

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
            Tendencia Mensual 2025
          </h1>
          <p className="text-lg text-gray-500 mt-2">Ventas por cliente (Miles MXN)</p>
        </div>
        {/* Legend con totales - interactive */}
        <div className="flex gap-4">
          {[
            { key: "FUTURAMA", color: COLORS.futurama, label: "FUTURAMA", total: totals.FUTURAMA },
            { key: "MERCO", color: COLORS.merco, label: "MERCO", total: totals.MERCO },
            { key: "HEB", color: COLORS.heb, label: "HEB", total: totals.HEB },
          ].map((item, index) => (
            <button
              key={item.key}
              onClick={() => setActiveClient(activeClient === item.key ? null : item.key)}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl transition-all duration-300 border ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              } ${
                activeClient === item.key
                  ? "bg-gray-100 border-gray-300 scale-105 shadow-md"
                  : "bg-gray-50 border-gray-100 hover:bg-gray-100 hover:scale-102"
              }`}
              style={{
                opacity: activeClient && activeClient !== item.key ? 0.4 : 1,
                transitionDelay: `${200 + index * 100}ms`
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                  activeClient === item.key ? "scale-125" : ""
                }`} style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <span className={`text-lg font-bold transition-all duration-300 ${
                activeClient === item.key ? "scale-110" : ""
              }`} style={{ color: item.color === "#9CA3AF" ? "#1A1A1A" : item.color }}>
                {item.total}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart - animated */}
      <div
        className={`flex-1 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 40, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 14 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: COLORS.gold, strokeWidth: 2, strokeDasharray: "5 5" }} />
            <Line
              type="monotone"
              dataKey="FUTURAMA"
              stroke={COLORS.futurama}
              strokeWidth={activeClient === "FUTURAMA" ? 5 : activeClient ? 1 : 2.5}
              dot={{ fill: COLORS.futurama, strokeWidth: 0, r: activeClient === "FUTURAMA" ? 5 : 3 }}
              activeDot={{ r: 8, fill: COLORS.futurama, stroke: "#fff", strokeWidth: 3 }}
              opacity={activeClient && activeClient !== "FUTURAMA" ? 0.2 : 1}
              animationDuration={1500}
              animationBegin={500}
            >
              <LabelList
                dataKey="FUTURAMA"
                position="top"
                formatter={(value: any) => value > 5000 ? `$${(value/1000).toFixed(1)}M` : ""}
                style={{ fontSize: 10, fill: COLORS.futurama }}
              />
            </Line>
            <Line
              type="monotone"
              dataKey="MERCO"
              stroke={COLORS.merco}
              strokeWidth={activeClient === "MERCO" ? 5 : activeClient ? 1 : 2.5}
              dot={{ fill: COLORS.merco, strokeWidth: 0, r: activeClient === "MERCO" ? 5 : 3 }}
              activeDot={{ r: 8, fill: COLORS.merco, stroke: "#fff", strokeWidth: 3 }}
              opacity={activeClient && activeClient !== "MERCO" ? 0.2 : 1}
              animationDuration={1500}
              animationBegin={700}
            >
              <LabelList
                dataKey="MERCO"
                position="top"
                formatter={(value: any) => value > 2000 ? `$${(value/1000).toFixed(1)}M` : ""}
                style={{ fontSize: 10, fill: COLORS.merco }}
              />
            </Line>
            <Line
              type="monotone"
              dataKey="HEB"
              stroke={COLORS.heb}
              strokeWidth={activeClient === "HEB" ? 5 : activeClient ? 1 : 2.5}
              dot={{ fill: COLORS.heb, strokeWidth: 0, r: activeClient === "HEB" ? 5 : 3 }}
              activeDot={{ r: 8, fill: COLORS.heb, stroke: "#fff", strokeWidth: 3 }}
              opacity={activeClient && activeClient !== "HEB" ? 0.2 : 1}
              animationDuration={1500}
              animationBegin={900}
            >
              <LabelList
                dataKey="HEB"
                position="bottom"
                formatter={(value: any) => value > 1000 ? `$${(value/1000).toFixed(1)}M` : ""}
                style={{ fontSize: 10, fill: COLORS.heb }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key insights - animated */}
      <div
        className={`flex justify-center gap-6 mt-2 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:shadow-md transition-all cursor-pointer hover:scale-102">
          <TrendingUp size={14} className="text-amber-600" />
          <span className="text-amber-700 text-sm font-medium">Pico Mar-Abr: FUTURAMA $8.1M</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:scale-102">
          <TrendingDown size={14} className="text-gray-600" />
          <span className="text-gray-700 text-sm font-medium">Mes bajo: Feb $2.3M total</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:shadow-md transition-all cursor-pointer hover:scale-102">
          <TrendingUp size={14} className="text-amber-600" />
          <span className="text-amber-700 text-sm font-medium">Pico Oct-Nov: $6.5M promedio</span>
        </div>
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          Picos en Marzo-Abril y Octubre-Noviembre. Febrero es el mes mas bajo.
        </p>
      </div>
    </div>
  )
}
