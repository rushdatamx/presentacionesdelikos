"use client"

import { useState, useEffect, ReactNode } from "react"

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl font-bold text-gray-900">D</span>
            </div>
            <h1 className="text-3xl font-bold text-white">DELIKOS</h1>
            <p className="text-gray-400 mt-2">Presentaciones Ejecutivas</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  placeholder="Ingresa tu contrasena"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Acceso restringido a personal autorizado
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
