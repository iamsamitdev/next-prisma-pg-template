import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { RegisterForm } from "./_components/register-form"

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "สมัครสมาชิกใหม่กับ BookGeek",
  keywords: "สมัครสมาชิก, BookGeek, จองผู้เชี่ยวชาญ, วิทยากร, การเรียนรู้, การสอน",
}

export default function Register() {
  return (
    <div className="flex h-dvh relative">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute z-50 lg:top-8 lg:left-8 top-6 left-1/2 lg:transform-none -translate-x-1/2 lg:translate-x-0 text-foreground lg:text-foreground/80 hover:text-foreground font-semibold text-lg lg:text-base transition-colors duration-200 flex items-center gap-2 bg-white/20 lg:bg-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border lg:border-0 border-white/30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="lg:inline">กลับหน้าหลัก</span>
      </Link>

      {/* Left Side - Form */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2 pt-20 lg:pt-8">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="text-foreground text-3xl font-bold tracking-tight">สมัครสมาชิก</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              กรอกข้อมูลของคุณด้านล่าง เพื่อเริ่มต้นการเรียนรู้กับผู้เชี่ยวชาญ
            </div>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            <Button className="w-full" variant="outline">
              สมัครสมาชิกด้วย Google
            </Button>
            <p className="text-muted-foreground text-center text-sm font-medium">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="login" className="text-primary font-semibold hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-blue-600/20 to-purple-600/20 z-10"></div>
        <img
          src="/images/auth/register_bg.avif"
          alt="BookGeek - เริ่มต้นการเรียนรู้"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-20"></div>
        <div className="relative z-30 flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="text-6xl font-bold text-white mb-4">
              🚀
            </div>
            <div className="space-y-4">
              <h1 className="text-white text-5xl font-light">เริ่มต้นเส้นทางใหม่</h1>
              <p className="text-white/90 text-xl max-w-md">
                ร่วมเป็นส่วนหนึ่งของชุมชนการเรียนรู้ เชื่อมต่อกับผู้เชี่ยวชาญที่ใช่สำหรับคุณ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}