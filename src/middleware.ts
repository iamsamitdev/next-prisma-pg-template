import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ตรวจสอบว่า path เป็น admin route หรือไม่
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
  // ถ้าไม่ใช่ admin route ให้ผ่านไปได้
  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // ตรวจสอบ auth token จาก cookies
  const authToken = request.cookies.get('auth-token')?.value
  
  // ถ้าไม่มี auth token ให้ redirect ไป login
  if (!authToken) {
    const loginUrl = new URL('/auth/login', request.url)
    // เก็บ URL ปัจจุบันเพื่อ redirect กลับมาหลัง login
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // สำหรับ Edge Runtime เราจะไม่ verify JWT ที่นี่
  // แต่จะให้ API routes และ client-side ทำการ verify แทน
  return NextResponse.next()
}

// กำหนด path ที่จะใช้ middleware
export const config = {
  matcher: [
    // ป้องกัน admin routes ทั้งหมด
    '/admin/:path*',
  ],
} 