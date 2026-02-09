"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Package } from "lucide-react"

const COLORS = {
  dark: "#1A1A1A",
  gold: "#F7B500",
  red: "#C0392B",
  gray: "#6B7280",
  green: "#27AE60",
}

const clientesData = [
  {
    nombre: "HEB",
    productos: [
      { nombre: "Durito 20pz", porcentaje: 38 },
      { nombre: "PDQ Papa 500g", porcentaje: 22 },
      { nombre: "Otros", porcentaje: 40 },
    ],
    status: "balanced",
    statusText: "Distribución equilibrada"
  },
  {
    nombre: "MERCO",
    productos: [
      { nombre: "Tostada Roja 70pz", porcentaje: 63, alerta: true },
      { nombre: "Durito 20pz", porcentaje: 4 },
      { nombre: "Otros", porcentaje: 33 },
    ],
    status: "alert",
    statusText: "Alta concentración"
  },
  {
    nombre: "FUTURAMA",
    productos: [
      { nombre: "Papa Mimarca 450g", porcentaje: 9 },
      { nombre: "Papa Deshidratada", porcentaje: 5 },
      { nombre: "Otros", porcentaje: 86 },
    ],
    status: "good",
    statusText: "Portafolio diversificado"
  },
]

export default function Slide6TopProductos() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (cliente: string) => {
    setSelectedClient(selectedClient === cliente ? null : cliente)
  }

  const activeClient = selectedClient !== null ? selectedClient : hoveredClient

  return (
    <div className="w-[1280px] h-[720px] bg-white p-12 font-sans flex flex-col">
      {/* Header - animated */}
      <div
        className={`mb-8 flex items-center gap-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="p-3 bg-amber-100 rounded-xl">
          <Package size={24} className="text-amber-700" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Top Productos por Cliente
          </h1>
          <p className="text-lg text-gray-500 mt-1">Concentración de ventas por SKU principal</p>
        </div>
      </div>

      {/* Cards Grid - animated */}
      <div className="flex-1 grid grid-cols-3 gap-8">
        {clientesData.map((cliente, clienteIndex) => {
          const isActive = activeClient === cliente.nombre
          const isDimmed = activeClient !== null && activeClient !== cliente.nombre

          return (
            <div
              key={cliente.nombre}
              className={`bg-gray-50 rounded-2xl p-8 flex flex-col cursor-pointer transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                isActive
                  ? "scale-[1.03] shadow-xl bg-white border-2 border-amber-200"
                  : isDimmed
                  ? "opacity-40"
                  : "hover:shadow-lg hover:bg-white"
              }`}
              style={{ transitionDelay: `${200 + clienteIndex * 150}ms` }}
              onMouseEnter={() => setHoveredClient(cliente.nombre)}
              onMouseLeave={() => setHoveredClient(null)}
              onClick={() => handleClick(cliente.nombre)}
            >
              {/* Cliente Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                    isActive ? "scale-150" : ""
                  }`}
                  style={{ backgroundColor: COLORS.gold }}
                ></div>
                <h2 className={`text-2xl font-bold text-[#1A1A1A] transition-all duration-300 ${
                  isActive ? "scale-105 origin-left" : ""
                }`}>{cliente.nombre}</h2>
              </div>

              {/* Products List */}
              <div className="flex-1 flex flex-col gap-4">
                {cliente.productos.map((producto, idx) => (
                  <div key={producto.nombre} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm transition-all duration-300 ${
                          idx === 0 ? "font-semibold text-[#1A1A1A]" : "text-gray-500"
                        } ${isActive && idx === 0 ? "font-bold" : ""}`}
                      >
                        {producto.nombre}
                      </span>
                      <span
                        className={`text-lg font-bold transition-all duration-300 ${
                          producto.alerta
                            ? "text-[#C0392B]"
                            : idx === 0
                            ? "text-[#1A1A1A]"
                            : "text-gray-400"
                        } ${isActive ? "scale-110" : ""}`}
                      >
                        {producto.porcentaje}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isLoaded ? `${producto.porcentaje}%` : "0%",
                          backgroundColor: producto.alerta
                            ? COLORS.red
                            : idx === 0
                            ? COLORS.gold
                            : "#D4D4D4",
                          transitionDelay: `${400 + clienteIndex * 150 + idx * 100}ms`,
                          transform: isActive && idx === 0 ? "scaleY(1.2)" : "scaleY(1)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div
                className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  cliente.status === "alert"
                    ? "bg-red-50 border border-red-200"
                    : cliente.status === "good"
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-100 border border-gray-200"
                } ${isActive ? "scale-[1.02]" : ""}`}
              >
                {cliente.status === "alert" && (
                  <AlertTriangle size={14} className={`text-red-600 ${isActive ? "animate-pulse" : ""}`} />
                )}
                {cliente.status === "good" && (
                  <CheckCircle size={14} className={`text-green-600 ${isActive ? "animate-pulse" : ""}`} />
                )}
                <p className={`text-xs font-medium text-center flex-1 ${
                  cliente.status === "alert" ? "text-red-600" : cliente.status === "good" ? "text-green-600" : "text-gray-600"
                }`}>
                  {cliente.statusText}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer - animated */}
      <div
        className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <p className="text-sm text-gray-500 text-center">
          MERCO tiene 63% en un solo producto. FUTURAMA está más diversificado.
        </p>
      </div>
    </div>
  )
}
