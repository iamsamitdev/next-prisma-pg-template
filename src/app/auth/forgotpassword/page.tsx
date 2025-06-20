import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { ForgotPasswordForm } from "./_components/forgotpassword-form"

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน",
  description: "รีเซ็ตรหัสผ่านของ BookGeek",
  keywords: "ลืมรหัสผ่าน, รีเซ็ตรหัสผ่าน, BookGeek, จองผู้เชี่ยวชาญ, วิทยากร",
}

export default function ForgotPassword() {
  return (
    <div className="flex h-dvh relative">
      {/* Back to Login Link */}
      <Link 
        href="/auth/login" 
        className="absolute z-50 lg:top-8 lg:left-8 top-6 left-1/2 lg:transform-none -translate-x-1/2 lg:translate-x-0 text-white lg:text-foreground/80 hover:text-white lg:hover:text-foreground font-semibold text-lg lg:text-base transition-colors duration-200 flex items-center gap-2 bg-black/20 lg:bg-white/20 px-4 py-2 lg:px-4 lg:py-2 rounded-full backdrop-blur-sm border lg:border border-white/30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="lg:inline">กลับไปเข้าสู่ระบบ</span>
      </Link>

      {/* Left Side - Form */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2 pt-20 lg:pt-8">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="text-foreground text-3xl font-bold tracking-tight">ลืมรหัสผ่าน?</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              ไม่ต้องกังวล กรอกอีเมลของคุณ เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้
            </div>
          </div>
          <div className="space-y-6">
            <ForgotPasswordForm />
            
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">หรือ</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto py-3">
                  <Link href="/auth/login" className="inline-flex items-center justify-center">
                    เข้าสู่ระบบ
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-3">
                  <Link href="/auth/register" className="inline-flex items-center justify-center">
                    สมัครสมาชิก
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20 z-10"></div>
        <img
          src="/images/auth/login_bg.avif"
          alt="BookGeek - รีเซ็ตรหัสผ่าน"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-20"></div>
        <div className="relative z-30 flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="text-6xl font-bold text-white mb-4">
              🔐
            </div>
            <div className="space-y-4">
              <h1 className="text-white text-5xl font-light">รีเซ็ตรหัสผ่าน</h1>
              <p className="text-white/90 text-xl max-w-md">
                เราจะช่วยให้คุณกลับมาใช้งาน BookGeek ได้อย่างปลอดภัย
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
