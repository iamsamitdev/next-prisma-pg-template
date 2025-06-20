"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { AuthUser } from '@/lib/auth'

// สร้าง interface สำหรับการจัดการการยืนยันตัวตน
interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

// สร้าง interface RegisterData สำหรับการจัดการการยืนยันตัวตน
interface RegisterData {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

// สร้าง context สำหรับการจัดการการยืนยันตัวตน
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// สร้าง component สำหรับการจัดการการยืนยันตัวตน
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // สร้างฟังก์ชันสำหรับการตรวจสอบการยืนยันตัวตน
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // สร้างฟังก์ชันสำหรับการเข้าสู่ระบบ
  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, remember }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
      }

      setUser(data.user)
    } catch (error) {
      setIsLoading(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // สร้างฟังก์ชันสำหรับการสมัครสมาชิก
  const register = async (registerData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
      }

      setUser(data.user)
    } catch (error) {
      setIsLoading(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // สร้างฟังก์ชันสำหรับการออกจากระบบ
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
      setUser(null)
    }
  }

  // สร้างฟังก์ชันสำหรับการตรวจสอบการยืนยันตัวตน
  useEffect(() => {
    checkAuth()
  }, [])

  // กำหนดตัวแปรไว้สำหรับการจัดการการยืนยันตัวตน
  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  }

  // สร้างฟังก์ชันสำหรับการจัดการการยืนยันตัวตน
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// สร้างฟังก์ชันสำหรับการจัดการการยืนยันตัวตน
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 