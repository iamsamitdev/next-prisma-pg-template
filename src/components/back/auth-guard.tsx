"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/auth/login' }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // ถ้าโหลดเสร็จแล้วและไม่มี user ให้ redirect ไป login
    if (!isLoading && !user) {
      const currentPath = window.location.pathname
      const loginUrl = `${redirectTo}?callbackUrl=${encodeURIComponent(currentPath)}`
      router.push(loginUrl)
    }
  }, [user, isLoading, router, redirectTo])

  // แสดง loading state ขณะตรวจสอบ authentication
  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r bg-muted/40">
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    )
  }

  // ถ้าไม่มี user ให้แสดงหน้าว่าง (จะถูก redirect ไป login)
  if (!user) {
    return null
  }

  // ถ้ามี user แล้วให้แสดง children
  return <>{children}</>
} 