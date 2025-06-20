import type { Metadata } from "next"
import { Suspense } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { LoginForm } from "./_components/login-form"

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ",
  description: "เข้าสู่ระบบของ BookGeek",
  keywords: "เข้าสู่ระบบ, BookGeek, จองผู้เชี่ยวชาญ, วิทยากร, การเรียนรู้, การสอน",
}

export default function Login() {
  return (
    <div className="flex h-dvh relative">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute z-50 lg:top-8 lg:left-8 top-6 left-1/2 lg:transform-none -translate-x-1/2 lg:translate-x-0 text-white lg:text-white/80 hover:text-white font-semibold text-lg lg:text-base transition-colors duration-200 flex items-center gap-2 bg-black/20 lg:bg-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="lg:inline">กลับหน้าหลัก</span>
      </Link>

      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 z-10"></div>
        <img
          src="/images/auth/login_bg.avif"
          alt="BookGeek - จองผู้เชี่ยวชาญและวิทยากร"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-20"></div>
        <div className="relative z-30 flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="text-6xl font-bold text-white mb-4">
              🎓
            </div>
            <div className="space-y-4">
              <h1 className="text-white text-5xl font-light">ยินดีต้อนรับกลับ</h1>
              <p className="text-white/90 text-xl max-w-md">
                จองผู้เชี่ยวชาญและวิทยากรมืออาชีพ เพื่อยกระดับความรู้และทักษะของคุณ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2 pt-20 lg:pt-8">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="text-foreground text-3xl font-bold tracking-tight">เข้าสู่ระบบ</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              ยินดีต้อนรับกลับ กรุณากรอกอีเมลและรหัสผ่านของคุณ
            </div>
          </div>
          <div className="space-y-4">
            <Suspense fallback={<div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>}>
              <LoginForm />
            </Suspense>
            <Button className="w-full" variant="outline">
              เข้าสู่ระบบด้วย Google
            </Button>
            <p className="text-muted-foreground text-center text-sm font-medium">
              ยังไม่มีบัญชี?{" "}
              <Link href="register" className="text-primary font-semibold hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}