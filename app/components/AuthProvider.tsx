"use client"

import { useState, useEffect, ReactNode } from "react"
import Image from "next/image"

// Credenciales
const VALID_USER = "delikos"
const VALID_PASSWORD = "admin123"

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Verificar si ya está autenticado (localStorage)
    const auth = localStorage.getItem("delikos_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (username === VALID_USER && password === VALID_PASSWORD) {
      localStorage.setItem("delikos_auth", "true")
      setIsAuthenticated(true)
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E31837] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#E31837] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo DELIKOS */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/images/delikos-logo.png"
                alt="DELIKOS"
                width={180}
                height={60}
                className="h-auto"
              />
            </div>
            <p className="text-white/90 mt-2 text-lg">Presentaciones Ejecutivas</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-[#E31837] mb-6 text-center">
              Iniciar Sesion
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] transition-colors"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contrasena
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] transition-colors"
                  placeholder="Ingresa tu contrasena"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-[#E31837] hover:bg-[#c41530] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-white/70 text-sm mt-6">
            Acceso restringido a personal autorizado
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
