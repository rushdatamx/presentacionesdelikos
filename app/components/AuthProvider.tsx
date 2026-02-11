"use client"

import { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

// Login deshabilitado - acceso público
export default function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>
}
